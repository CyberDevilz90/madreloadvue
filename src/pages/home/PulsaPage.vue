<script setup>
import { ref } from "vue";
import { listProdukPulsa } from "../../lib/produkPulsa";
import { formatPrice } from "../../lib/utils";
import { pulsaProviders } from "@/lib/provider";

import ListProduct from "../../components/ui/ListProduct.vue";

const selectedProvider = ref("");
const selectedType = ref("");
const selectedProducts = ref([]);
const listProviders = pulsaProviders.map((data) => data);
// eslint-disable-next-line
let buyer_sku_code = ref(null)
let nomor_pelanggan = ref(null)

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
    product.selected = false;
  });
}

function selectProduct(productId) {
  buyer_sku_code = productId
  selectedProducts.value.forEach((product) => {
    product.selected = product.buyer_sku_code === productId; 
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
