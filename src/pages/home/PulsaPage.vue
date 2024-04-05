<script setup>
import { ref } from "vue";
import { listProdukPulsa } from "../../lib/produkPulsa";
import { formatPrice } from "../../lib/utils";

const selectedProvider = ref("");
const selectedType = ref("");

const selectedProducts = ref([]);

function filterProducts() {
  selectedProducts.value = listProdukPulsa.filter((product) => {
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
  });
}
</script>
<template>
  <div class="p-5 mb-5">
    <div class="flex justify-center gap-3 p-5 mb-5 card">
      <input
        class="w-1/4 p-[8px] rounded-md"
        type="number"
        placeholder="Nomor Tujuan"
      />
      <select
        @change="filterProducts"
        v-model="selectedProvider"
        class="w-1/4 p-[8px] rounded-md ml-3"
      >
        <option value="">Pilih Provider</option>
        <option value="AXIS">Axis</option>
        <option value="by.U">By.U</option>
        <option value="INDOSAT">Indosat Ooredoo</option>
        <option value="SMARTFREN">Smartfren</option>
        <option value="TELKOMSEL">Telkomsel</option>
        <option value="TRI">Tri</option>
        <option value="XL">XL Axiata</option>
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
      <div  class="w-1/4 p-[8px] rounded-md text-center bg-green-600 hover:cursor-pointer">
        <p class="font-bold text-white">Checkout</p>
      </div>
    </div>
    <div class="p-5 mb-10 card">
      <div v-if="selectedProducts.length">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="product in selectedProducts"
            :key="product.buyer_sku_code"
            class="p-4 bg-white rounded shadow-md"
          >
            <div
              class="bg-gradient-to-r from-cyan-500 to-blue-500 mt-[-1rem] text-center rounded-b-full h-8 mb-4 flex items-center justify-center"
            >
              <p class="text-sm font-bold text-white">
                Rp {{ product.formattedPrice }}
              </p>
            </div>
            <h3 class="mb-2 font-semibold text">
              {{ product.product_name }}
            </h3>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Produk Kosong</p>
      </div>
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
