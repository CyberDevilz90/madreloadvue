<script setup>
import { onMounted, ref } from "vue";
import { formatPrice } from "../../lib/utils";
import { pulsaProviders } from "@/lib/provider";
import axios from "axios";
import ListProduct from "../../components/ui/ListProduct.vue";
import { useAuthStore } from "@/store/modules/auth";
import Loader from "@/components/ui/Loader.vue";
import router from "@/router";

const isLoading = ref(false);
const authStore = useAuthStore();
const selectedProvider = ref("");
const selectedType = ref("");
const selectedProducts = ref([]);
const listProviders = pulsaProviders.map((data) => data);
const buyer_sku_code = ref(""); // Use ref for reactivity
const nomor_pelanggan = ref(""); // Use ref for reactivity
const listProdukPulsa = ref([]);

async function fetchData() {
  try {
    isLoading.value = true;
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/product/list-ppob`;
    const response = await axios.get(apiUrl);
    listProdukPulsa.value = response.data.data; // Store fetched data
    filterProducts(); // Filter products based on initial state
    isLoading.value = false
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function filterProducts() {
  selectedProducts.value = listProdukPulsa.value.filter((product) => {
    return (
      (product.category === selectedType.value &&
        product.brand === selectedProvider.value) ||
      (product.category === "Pulsa" &&
        product.brand === selectedProvider.value &&
        product.type === selectedType.value)
    );
  });
  selectedProducts.value.sort((a, b) => a.price - b.price);
  selectedProducts.value.forEach((product) => {
    product.formattedPrice = formatPrice(product.price);
    product.selected = false;
  });
}

function selectProduct(productId) {
  buyer_sku_code.value = productId; // Update ref value
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId;
  });
}

async function checkout() {
  if (!buyer_sku_code.value || !nomor_pelanggan.value) {
    alert("Please select a product and enter the customer number.");
    return;
  }

  try {
    isLoading.value = true;
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/transactions/create-order`;
    const payload = {
      buyer_sku_code: buyer_sku_code.value,
      customer_no: nomor_pelanggan.value,
      user_id: `${authStore.user.id}` // Get user ID from auth store
    };
    // eslint-disable-next-line
    const response = await axios.post(apiUrl, payload);
    isLoading.value = false
    router.go(-1)
  } catch (error) {
    if (error.response && error.response.data.error === "Insufficient balance") {
      alert("Saldo Tidak Cukup, Silahkan Top Up Saldo Terlebih Dahulu");
      isLoading.value = false;
    } else {
      console.error("Error performing transaction:", error);
      isLoading.value = false;
    }
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
   <div
    v-if="isLoading"
    class="absolute inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <Loader width="100px" height="100px" />
  </div>
  <div class="p-5 mb-5">
    <div class="flex justify-center gap-3 p-5 mb-5 card">
      <input
        class="w-1/4 p-[8px] rounded-md"
        type="text"
        placeholder="Nomor Tujuan"
        v-model.lazy="nomor_pelanggan"
      />
      <select
        @change="filterProducts"
        v-model="selectedProvider"
        class="w-1/4 p-[8px] rounded-md ml-3"
      >
        <option value="">Pilih Provider</option>
        <option
          v-for="provider in listProviders"
          :value="provider.value"
          :key="provider"
        >
          {{ provider.name }}
        </option>
      </select>
      <select
        @change="filterProducts"
        v-model="selectedType"
        class="w-1/4 p-[8px] rounded-md ml-3"
      >
        <option value="">Pilih Jenis Produk</option>
        <option value="Masa Aktif">Masa Aktif</option>
        <option value="Umum">Umum</option>
        <option value="Pulsa Transfer">Transfer</option>
      </select>
      <div
        class="w-1/4 p-[8px] rounded-md text-center bg-green-600 hover:cursor-pointer"
        @click="checkout"
      >
        <p class="font-bold text-white">Checkout</p>
      </div>
    </div>
    <div class="p-5 mb-10 card">
      <ListProduct
        :selectedProducts="selectedProducts"
        @select="selectProduct"
      />
    </div>
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
