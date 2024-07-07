<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { formatPrice } from "@/lib/utils";
import Loader from "@/components/ui/Loader.vue";

const dataPriceList = ref([]);
const isLoading = ref(false);
const selectedCategory = ref("");


// Fetch data from the API
const getPriceListPPOB = async () => {
  isLoading.value = true;
  const url = "http://127.0.0.1:5000/product/list-social-media";
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
    return categoryMatch
  });
});

// Options for the filter dropdowns
const uniqueCategories = computed(() => {
  return [...new Set(dataPriceList.value.map((item) => item.category))];
});

onMounted(() => {
  getPriceListPPOB();
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
    </div>
    <table class="w-full">
      <tr class="bg-white">
        <th>Nama</th>
        <th>Category</th>
        <th>Price</th>
      </tr>
      <tr v-for="x in filteredData" :key="x.buyer_sku_code" class="p-2 m-4 bg-slate-50">
        <td class="text-center w-[60%]">{{ x.name }}</td>
        <td class="text-center w-[15%]">{{ x.category }}</td>
        <td class="text-center w-[15%]">{{ formatPrice(parseInt(x.price)) }}</td>
      </tr>
    </table>
  </div>
</template>
