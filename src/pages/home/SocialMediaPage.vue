<script setup>
import { ref, watch, onMounted } from "vue";
import { formatPrice } from "../../lib/utils";
import { rule } from "../../lib/peraturan";
import axios from "axios";
import Loader from "@/components/ui/Loader.vue";
import SocialMediaRule from "../../components/ui/SocialMediaRule.vue";
import VueSelect from "vue3-select";
import "vue3-select/dist/vue3-select.css";
import router from "@/router";
import { useAuthStore } from "@/store/modules/auth";

const authStore = useAuthStore()
const isLoading = ref(false);
const listSocialMedia = ref([]);
const selectedCategory = ref("");
const selectedProduct = ref("");
const selectedProducts = ref([]);
const listCategories = ref([]);
const commentInput = ref("");
const totalPrice = ref(null);
const jumlahInput = ref(0);
const userId = ref("");

const getPriceListPPOB = async () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_BE_API_URL}/product/list-social-media`;
  try {
    const response = await axios.get(url);
    listSocialMedia.value = response.data.data;
    listCategories.value = [
      ...new Set(listSocialMedia.value.map((product) => product.category)),
    ];
    filterProducts();
    isLoading.value = false;
  } catch (e) {
    console.error(e);
    isLoading.value = false;
  }
};

function filterProducts() {
  selectedProducts.value = listSocialMedia.value.filter((product) => {
    return product.category === selectedCategory.value;
  });
  selectedProducts.value.sort((a, b) => a.price - b.price);
  selectedProducts.value.forEach((product) => {
    product.formattedPrice = formatPrice(parseInt(product.price));
  });
  selectedProduct.value = null;
}

function selectProduct(productId) {
  const product = selectedProducts.value.find(
    (product) => product.id === productId
  );
  if (product) {
    selectedProduct.value = product.id;
    product.formattedPrice = formatPrice(parseInt(product.price));
  } else {
    selectedProduct.value = "";
  }
}

function calculateTotalPrice() {
  const selectedProd = selectedProducts.value.find(
    (p) => p.id === selectedProduct.value
  );
  if (selectedProd) {
    const jumlah = jumlahInput.value ? parseInt(jumlahInput.value) : 0;
    const hargaPer1000 = parseInt(selectedProd.price);
    totalPrice.value = Math.ceil((jumlah / 1000) * hargaPer1000);
  } else {
    totalPrice.value = 0;
  }
}

async function checkout() {
  if (selectedProduct.value == "" || userId.value == ""){
    alert("Silahkan pilih layanan dan isi Username / Link tujuan")
  }

  try {
    isLoading.value = true
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/transactions/create-order-ssm`
    const payload = {
      user_id: `${authStore.user.id}`,
      service: selectedProduct.value,
      destination: userId.value,
      quantity: jumlahInput.value,
      price: totalPrice.value,
    }
    //eslint-disable-next-line
    const response = await axios.post(apiUrl, payload)
    isLoading.value = false
    router.go(-1)
  } catch (error){
    if (error.response && error.response.data.error === "Insufficient balance") {
      alert("Saldo tidak cukup, Silahkan Top Up saldo telebih dahulu")
      isLoading.value = false
    } else {
      console.error("Error performing transaction", error)
      isLoading.value = false
    }
  }
}

watch(selectedCategory, filterProducts);
watch(
  () => [selectedProduct.value, jumlahInput.value],
  () => {
    calculateTotalPrice();
  }
);

onMounted(() => {
  getPriceListPPOB();
});
</script>

<template>
  <div
    v-if="isLoading"
    class="absolute inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <Loader width="100px" height="100px" />
  </div>
  <div class="w-full p-5 mb-5">
    <div class="flex flex-col justify-center pt-5 card">
      <p>Category :</p>
      <vue-select
        :options="listCategories"
        v-model="selectedCategory"
        placeholder="Pilih Category"
        @input="filterProducts"
        class="w-full p-[8px] rounded-md bg-white mb-2"
      ></vue-select>
      <p>Layanan :</p>
      <select
        @change="selectProduct($event.target.value)"
        v-model="selectedProduct"
        class="p-[8px] rounded-md w-full"
      >
        <option value="">Pilih Layanan</option>
        <option
          v-for="product in selectedProducts"
          :value="product.id"
          :key="product.id"
        >
          {{ product.name }}
        </option>
      </select>
    </div>
    <div class="flex items-center justify-center gap-3 p-5 mt-5 card">
      <p>Target :</p>
      <input
        class="w-1/3 p-[8px] rounded-md"
        type="text"
        placeholder="Username / Link"
        v-model="userId"
      />
      <p>Jumlah :</p>
      <input
        class="w-1/3 p-[8px] rounded-md"
        type="number"
        placeholder="Jumlah"
        v-model="jumlahInput"
        :min="
          selectedProduct
            ? selectedProducts.find((p) => p.id === selectedProduct).min
            : ''
        "
        :max="
          selectedProduct
            ? selectedProducts.find((p) => p.id === selectedProduct).max
            : ''
        "
      />
    </div>
    <div
      v-if="
        selectedProduct &&
        selectedProducts.find((p) => p.id === selectedProduct).jenis ===
          'Comment'
      "
      class="flex flex-col justify-center pt-5 mt-5 card"
    >
      <p>1 comment / 1 baris</p>
      <textarea
        v-model="commentInput"
        placeholder="Masukkan komentar Anda di sini..."
        class="w-full p-[8px] rounded-md"
        rows="3"
      ></textarea>
    </div>
    <div class="flex w-full gap-5 p-5">
      <div class="w-1/2 card">
        <div class="flex flex-col items-center justify-center">
          <h3 class="p-3 font-bold">PERATURAN SEBELUM MELAKUKAN PEMBELIAN</h3>
          <div>
            <ol type="1" class="mb-3 text-sm">
              <li v-for="(list, index) in rule" :key="index">
                <p class="mb-2">
                  {{ list.message }}
                </p>
              </li>
            </ol>
            <p class="mb-3">
              <small
                ><strong
                  >*Tidak ada pengembalian saldo apabila anda melanggar
                  peraturan di atas!</strong
                ></small
              >
            </p>
          </div>
        </div>
      </div>
      <div v-if="selectedProduct" class="w-1/2 card pt-[15px] h-auto">
        <div
          class="bg-gradient-to-r from-cyan-500 to-blue-500 mt-[-1rem] text-center rounded-b-full h-8 mb-4 flex items-center justify-center"
        >
          <p class="text-sm font-bold text-white">
            {{
              selectedProducts.find((p) => p.id === selectedProduct)
                .formattedPrice
            }}
            / 1000
          </p>
        </div>
        <span class="font-bold text-red-600"> min : </span>
        <span
          class="font-bold text-red-600"
          v-html="selectedProducts.find((p) => p.id === selectedProduct).min"
        ></span>
        <span class="font-bold text-red-600"> max : </span>
        <span
          class="font-bold text-red-600"
          v-html="selectedProducts.find((p) => p.id === selectedProduct).max"
        ></span>
        <p>
          Note:
          <span
            v-html="
              selectedProducts
                .find((p) => p.id === selectedProduct)
                .note.split('\n')
                .map((line, index) => (index ? '<br>' + line : line))
                .join('')
            "
          ></span>
        </p>
      </div>
      <div v-else class="w-1/2 card pt-[15px] h-auto">
        <p class="text-center">*Pilih Layanan</p>
      </div>
    </div>
    <p v-if="totalPrice !== null" class="text-center">
      Total = {{ formatPrice(totalPrice) }}
    </p>
    <div @click="checkout"
      class="w-full p-[8px] mt-5 mb-5 text-center bg-green-600 rounded-md hover:cursor-pointer"
    >
      <p class="font-bold text-white">Checkout</p>
    </div>
    <SocialMediaRule />
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: whitesmoke;
}
</style>
