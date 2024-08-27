<script setup>
import { ref, watch, onMounted } from "vue";
import { formatPrice } from "../../lib/utils";
import { game } from "../../lib/listGame";
import axios from "axios";
import { useAuthStore } from "@/store/modules/auth";
import router from "@/router"; // Import router
import ListProduct from "../../components/ui/ListProduct.vue";

const isLoading = ref(false);
const authStore = useAuthStore();
const listProdukPulsa = ref([]);
const selectedProducts = ref([]);
const gameOptions = ref(game);
const selectedGame = ref("");
const nomor_pelanggan = ref("");
const keteranganProduct = ref("");
const buyer_sku_code = ref(""); // Add this ref for selected product

async function fetchData() {
  try {
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/product/list-ppob`;
    const response = await axios.get(apiUrl);
    listProdukPulsa.value = response.data.data; // Ensure correct data access
    filterSelectedProducts(); // Filter products based on initial state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const filterSelectedProducts = () => {
  selectedProducts.value = listProdukPulsa.value
    .filter((product) => {
      return (
        product.category === "Games" && 
        product.brand === selectedGame.value
      );
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

function selectProduct(productId) {
  buyer_sku_code.value = productId;
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId; // Menandai produk yang dipilih
  });
}

// Fungsi untuk mendapatkan keterangan permainan yang dipilih
const getGameKeterangan = (selectedGameName) => {
  const game = gameOptions.value.find((game) => game.name === selectedGameName);
  return game ? game.keterangan : "";
};

async function checkout() {
  if (!buyer_sku_code.value || nomor_pelanggan.value == "") { // Check for required fields
    alert("Please select a product and enter the customer number.");
    return;
  }

  try {
    isLoading.value = true;
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/transactions/create-order`;
    const payload = {
      customer_no: nomor_pelanggan.value,
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
        v-model="nomor_pelanggan"
        class="w-1/3 p-[8px] rounded-md"
        type="text"
        placeholder="User ID"
      />
      <select
        @change="selectedGame = $event.target.value"
        v-model="selectedGame"
        class="w-1/3 p-[8px] rounded-md ml-3"
      >
        <option value="">Pilih Game</option>
        <option
          v-for="(game, index) in gameOptions"
          :value="game.name"
          :key="index"
        >
          {{ game.name }}
        </option>
      </select>
      <div
        @click="checkout"
        class="w-1/3 p-[8px] rounded-md text-center bg-green-600 hover:cursor-pointer"
      >
        <p class="font-bold text-white">Checkout</p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-3 p-5 mb-5 card">
      {{ selectedGame }}
      <p>Keterangan : {{ getGameKeterangan(selectedGame) }}</p>
      <p>{{ keteranganProduct }}</p>
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
