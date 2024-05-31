<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { formatPrice } from "../../lib/utils";
// import { listProdukPulsa } from "../../lib/produkPulsa";

import ListProduct from "@/components/ui/ListProduct.vue";

const apiResponse = ref(null);
const userId = ref("");
// const filteredProducts = ref([]);
let listProdukPulsa = ref([])
// const selectedProvider = ref("");
// const selectedType = ref("");
const selectedProducts = ref([]);
// eslint-disable-next-line
let buyer_sku_code = ref(null);

async function fetchData() {
  try {
    const apiUrl = `${
      process.env.VUE_APP_BE_API_URL || "http://127.0.0.1:5000"
    }/product/list-ppob`;
    const response = await axios.get(apiUrl);
    listProdukPulsa.value = response.data.data; // Store fetched data
    filterProducts(); // Filter products based on initial state
  } catch (error) {
    // console.error("Error fetching data:", error);
  }
}
// Filter produk berdasarkan kategori "PLN"
function filterProducts() {
  selectedProducts.value = listProdukPulsa.value.filter((product) => {
    return (product.category === "PLN")
  });
  selectedProducts.value.sort((a, b) => a.price - b.price);
  selectedProducts.value.forEach((product) => {
    product.formattedPrice = formatPrice(product.price);
    product.selected = false;
  });
}

const selectProduct = (productId) => {
  buyer_sku_code = productId
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId; 
  });
};

const handleInputCompletion = () => {
  // Membuat objek JSON dengan data yang diperlukan
  const requestData = {
    commands: "pln-subscribe",
    customer_no: userId.value, // Menggunakan nilai dari input sebagai nomor pelanggan
  };

  // Menggunakan axios untuk mengirim permintaan POST ke API
  axios
    .post("https://api.digiflazz.com/v1/transaction", requestData, {headers: {
      "Access-Control-Allow-Origin": "*"
    }})
    .then((response) => {
      // console.log("Response from API:", response.data);
      // Menyimpan respons dari permintaan API
      apiResponse.value = response.data;
    })
    .catch((error) => {
      console.error("Error while sending request:", error);
      // Tangani kesalahan jika terjadi
    });
};
const checkout = () => {
  // Lakukan logika checkout di sini
  console.log("Checkout triggered");
};

watch(userId, () => {
  if (userId.value !== "") {
    // Pastikan userId tidak kosong
    handleInputCompletion();
  }
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="p-5 mb-5">
    <div class="flex justify-center gap-3 p-5 mb-5 card">
      <input
        v-model.lazy="userId"
        class="w-1/3 p-[8px] rounded-md"
        type="number"
        placeholder="No Pelanggan"
      />
      <div
        @click="checkout"
        class="w-1/3 p-[8px] rounded-md text-center bg-green-600 hover:cursor-pointer"
      >
        <p class="font-bold text-white">Checkout</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-3 p-5 mb-5 card">
      <p>Informasi Pelanggan :</p>
      <pre>{{ apiResponse }}</pre>
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
