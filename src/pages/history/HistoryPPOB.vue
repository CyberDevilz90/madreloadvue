<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/modules/auth";
import { formatPrice } from "@/lib/utils";

const historyPPOB = ref([]);
const error = ref(null);
const authStore = useAuthStore();

const getHistoryPPOB = async () => {
  await authStore.fetchUserByToken();
  const url = `${process.env.VUE_APP_BE_API_URL}/history/ppob`;
  try {
    const response = await axios.get(url);
    historyPPOB.value = response.data.data;
  } catch (err) {
    error.value = err.response.data.message || "An error occurred";
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(() => {
  getHistoryPPOB();
});
</script>
<template>
  <div class="mb-5">
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <table class="w-full">
        <tr class="bg-white">
          <th>ID Trx</th>
          <th>Nama</th>
          <th>Tujuan</th>
          <th>Harga</th>
          <th>Status</th>
          <th>Tanggal</th>
        </tr>
        <tr
          v-for="item in historyPPOB"
          :key="item.id"
          class="p-2 m-4 bg-slate-50"
        >
          <th class="w-[5%]">{{ item.id }}</th>
          <th class="text-center w-[40%]">{{ item.product_name }}</th>
          <th class="text-center w-[15%]">{{ item.customer_no }}</th>
          <th class="text-center w-[15%]">{{ formatPrice(item.price) }}</th>
          <th
            :class="[
              'text-center w-[15%] text-white',
              item.status == 'Pending'
                ? 'bg-yellow-300'
                : item.status == 'Sukses'
                ? 'bg-green-500'
                : item.status == 'Gagal'
                ? 'bg-red-500'
                : '',
            ]"
          >
            {{ item.status }}
          </th>
          <th class="text-center w-[15%]">
            {{ formatDate(item.tanggal_order) }}
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>
