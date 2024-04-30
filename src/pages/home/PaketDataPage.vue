<script setup>
import { ref, watch } from "vue";
import { listProdukPulsa } from "../../lib/produkPulsa";
import { listTipeData } from "../../lib/tipePaketData";
import { formatPrice } from "../../lib/utils";

import ListProduct from "@/components/ui/ListProduct.vue";

const selectedProvider = ref("");
const selectedType = ref("");
const selectedProducts = ref([]);
const listProviders = listTipeData.map((data) => data.provider);
let listSelectedTypes = [];

function updateSelectedTypes(provider) {
  const selectedProviderData = listTipeData.find(
    (data) => data.provider === provider
  );
  if (selectedProviderData) {
    listSelectedTypes = selectedProviderData.tipe;
  }
}

function filterProducts() {
  selectedProducts.value = listProdukPulsa.filter((product) => {
    return (
      product.category === "Data" &&
      product.brand === selectedProvider.value &&
      product.type === selectedType.value
    );
  });
  selectedProducts.value.sort((a, b) => a.price - b.price);
  selectedProducts.value.forEach((product) => {
    product.formattedPrice = formatPrice(product.price);
    product.selected = false;
  });
}

function selectProduct(productId) {
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId; // Menandai produk yang dipilih
  });
}

watch(selectedProvider, (newValue) => {
  updateSelectedTypes(newValue);
  filterProducts();
});
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
        <option
          v-for="provider in listProviders"
          :value="provider"
          :key="provider"
        >
          {{ provider }}
        </option>
      </select>
      <select
        @change="filterProducts"
        v-model="selectedType"
        class="w-1/4 p-[8px] rounded-md ml-3"
      >
        <option value="">Pilih Jenis Produk</option>
        <option v-for="type in listSelectedTypes" :value="type" :key="type">
          {{ type }}
        </option>
      </select>
      <div
        class="w-1/4 p-[8px] rounded-md text-center bg-green-600 hover:cursor-pointer"
      >
        <p class="font-bold text-white">Checkout</p>
      </div>
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
