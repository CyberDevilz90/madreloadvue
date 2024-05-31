<script setup>
import { ref, watch } from "vue";
// import { listProdukPulsa } from "../../lib/produkPulsa";
import { formatPrice } from "../../lib/utils";
import { wallet } from "../../lib/ewallet";
import axios from "axios";

import ListProduct from "@/components/ui/ListProduct.vue";

// const filteredProducts = ref([]);
let userId = ref("");

// Filter produk berdasarkan merek yang valid
let listProdukPulsa = ref([])
const selectedProducts = ref([]);
const gameOptions = ref(wallet);
const selectedGame = ref("");

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
      return product.category === "E-Money" && product.brand === selectedGame.value;
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
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId; // Menandai produk yang dipilih
  });
}

// Memanggil fungsi filterSelectedProducts saat perubahan pada selectedGame
watch(selectedGame, () => {
  fetchData();
});

// Fungsi untuk checkout
const checkout = () => {
  // Lakukan logika checkout di sini
  console.log("Checkout triggered");
};
</script>

<template>
  <div class="p-5 mb-5">
    <div class="flex justify-center gap-3 p-5 mb-5 card">
      <input
        v-model="userId"
        class="w-1/3 p-[8px] rounded-md"
        type="number"
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
