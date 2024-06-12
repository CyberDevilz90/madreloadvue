<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { formatPrice } from "../../lib/utils";


import ListProduct from "@/components/ui/ListProduct.vue";

const apiResponse = ref("");
const userId = ref("");
const pesanError = ref("");
let listProdukPulsa = ref([])
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
    console.error("Error fetching data:", error);
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
  const inputUserId  = userId.value;
  const requestData = {
    userId: inputUserId 
  };
  axios
    .post("http://localhost:5000/utils/validasi-pln", requestData)
    .then((response) => {
      apiResponse.value = response.data.data;
    })
    .catch((error) => {
      pesanError.value = error.message
    });
};

const checkout = () => {
  // Lakukan logika checkout di sini
  console.log("Checkout triggered");
};

watch(userId, () => {
  if (userId.value !== "") {
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
        type="text"
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
      <pre>{{ pesanError || "" }}</pre>
      <pre>{{ apiResponse.meter_no || "" }}</pre>
      <pre>{{ apiResponse.name || "" }}</pre>
      <pre>{{ apiResponse.segment_power || "" }}</pre>
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
