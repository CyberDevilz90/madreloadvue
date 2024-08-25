<script setup>
import axios from "axios";
import { ref, onMounted, computed, watch } from "vue";
import { formatPrice } from "@/lib/utils";
import Loader from "@/components/ui/Loader.vue";

const dataPriceList = ref([]);
const isLoading = ref(false);
const selectedCategory = ref(null);
const selectedBrand = ref(null);

// Fetch data from the API
const getPriceListPPOB = async () => {
  isLoading.value = true;
  const url = "http://127.0.0.1:5000/product/list-ppob";
  try {
    const response = await axios.get(url);
    dataPriceList.value = response.data.data;
    isLoading.value = false;
  } catch (e) {
    console.error(e);
    isLoading.value = false;
  }
};

// Filtered data based on selectedCategory and selectedBrand
const filteredData = computed(() => {
  return dataPriceList.value.filter((item) => {
    const categoryMatch = selectedCategory.value
      ? item.category === selectedCategory.value
      : true;
    const brandMatch = selectedBrand.value
      ? item.brand === selectedBrand.value
      : true;
    return categoryMatch && brandMatch;
  });
});

// Options for the filter dropdowns
const uniqueCategories = computed(() => {
  return [...new Set(dataPriceList.value.map((item) => item.category))];
});

const uniqueBrands = computed(() => {
  if (selectedCategory.value) {
    return [
      ...new Set(
        dataPriceList.value
          .filter((item) => item.category === selectedCategory.value)
          .map((item) => item.brand)
      ),
    ];
  }
  return [...new Set(dataPriceList.value.map((item) => item.brand))];
});

// Reset Brand selection when Category changes
const resetBrand = () => {
  selectedBrand.value = "";
};

const getStatus = (seller_status, buyer_status) => {
  if (seller_status === "true" && buyer_status === "true") {
    return "Lancar";
  } else {
    return "Gangguan";
  }
};

onMounted(() => {
  getPriceListPPOB();
});

watch(selectedCategory, () => {
  resetBrand();
});
</script>
<template>
  <div v-if="isLoading" class="flex justify-center">
    <Loader width="100px" height="100px" />
  </div>
  <div v-else>
    <div class="flex flex-col items-center justify-center gap-2 m-3">
      <div>
        <label for="category">Category:</label>
        <select id="category" v-model="selectedCategory" class="rounded-lg">
          <option value="">All</option>
          <option
            v-for="category in uniqueCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div>
        <label for="brand">Brand:</label>
        <select id="brand" v-model="selectedBrand" class="rounded-lg">
          <option value="">All</option>
          <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>
    </div>
    <table class="w-full">
      <tr class="bg-white">
        <th>Kode Produk</th>
        <th>Nama</th>
        <th>Brand</th>
        <th>Category</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
      <tr
        v-for="x in filteredData"
        :key="x.buyer_sku_code"
        class="p-2 m-4 bg-slate-50"
      >
        <td class="text-center w-[5%]">{{ x.buyer_sku_code }}</td>
        <td class="text-center w-[40%]">{{ x.product_name }}</td>
        <td class="text-center w-[15%]">{{ x.brand }}</td>
        <td class="text-center w-[15%]">{{ x.category }}</td>
        <td class="text-center w-[15%]">{{ formatPrice(x.price) }}</td>
        <td
          :class="[
            'text-center w-[15%]',
            x?.seller_product_status == 'true' &&
            x?.buyer_product_status == 'true'
              ? 'bg-green-500'
              : 'bg-red-500',
          ]"
        >
          {{ getStatus(x.seller_product_status, x.buyer_product_status) }}
        </td>
      </tr>
    </table>
  </div>
</template>
