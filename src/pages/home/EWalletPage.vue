<script setup>
import { ref, watch, onMounted } from "vue";
import { formatPrice } from "../../lib/utils";
import { wallet } from "../../lib/ewallet";
import { useAuthStore } from "@/store/modules/auth";
import router from "@/router";
import ListProduct from "@/components/ui/ListProduct.vue";
import axios from "axios";

const isLoading = ref(false);
const authStore = useAuthStore();
const listProdukPulsa = ref([])
const selectedProducts = ref([]);
const gameOptions = ref(wallet);
const selectedGame = ref("");
const userId = ref("");
const buyer_sku_code = ref("");

async function fetchData() {
  try {
    const apiUrl = `${
      process.env.VUE_APP_BE_API_URL || "http://127.0.0.1:5000"
    }/product/list-ppob`;
    const response = await axios.get(apiUrl);
    listProdukPulsa.value = response.data.data; // Store fetched data
    filterSelectedProducts(); // Filter products based on initial state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// Memfilter produk berdasarkan merek (brand) permainan yang dipilih
const filterSelectedProducts = () => {
  selectedProducts.value = listProdukPulsa.value
    .filter((product) => {
      return product.category === "E-Money" && 
      product.brand === selectedGame.value;
    })
    .map((product) => {
      return {
        ...product,
        formattedPrice: formatPrice(product.price),
      };
    });
  selectedProducts.value.sort((a, b) => a.price - b.price);
  selectedProducts.value.forEach((product) => {
    product.formattedPrice = formatPrice(product.price);
    product.selected = false;
  });
};

// Fungsi untuk mendapatkan keterangan permainan yang dipilih
const getGameKeterangan = (selectedGameName) => {
  const wallet = gameOptions.value.find(
    (wallet) => wallet.name === selectedGameName
  );
  return wallet ? wallet.keterangan : "";
};

function selectProduct(productId) {
  buyer_sku_code.value = productId;
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId; // Menandai produk yang dipilih
  });
}

async function checkout() {
  if (!buyer_sku_code.value || userId.value == "") { // Check for required fields
    alert("Please select a product and enter the customer number.");
    return;
  }

  try {
    isLoading.value = true;
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/transactions/create-order`;
    console.log(userId.value)
    const payload = {
      customer_no: userId.value,
      buyer_sku_code: buyer_sku_code.value,
      user_id: `${authStore.user.id}` 
    };
    // eslint-disable-next-line
    const response = await axios.post(apiUrl, payload);
    isLoading.value = false;
    router.go(-1); // Go back after successful checkout
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

// Memanggil fungsi filterSelectedProducts saat perubahan pada selectedGame
watch(selectedGame, () => {
  filterSelectedProducts();
});

onMounted(() => {
  fetchData();
});

</script>

<template>
  <div class="p-5 mb-5">
    <div class="flex justify-center gap-3 p-5 mb-5 card">
      <input
        v-model="userId"
        class="w-1/3 p-[8px] rounded-md"
        type="text"
        placeholder="No Pelanggan"
      />
      <select
        @change="selectedGame = $event.target.value"
        v-model="selectedGame"
        class="w-1/3 p-[8px] rounded-md ml-3"
      >
        <option value="">Pilih Wallet</option>
        <option
          v-for="(wallet, index) in gameOptions"
          :value="wallet.name"
          :key="index"
        >
          {{ wallet.name }}
        </option>
      </select>
      <div
        @click="checkout"
        class="w-1/3 p-[8px] rounded-md text-center bg-green-600 hover:cursor-pointer"
      >
        <p class="font-bold text-white">Checkout</p>
      </div>
    </div>
    <div class="flex justify-center gap-3 p-5 mb-5 card">
      {{ selectedGame }}
      <p>Keterangan : {{ getGameKeterangan(selectedGame) }}</p>
    </div>

    <div class="p-5 card">
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
