<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/modules/auth";
import { formatPrice } from "@/lib/utils";

const historySMM = ref([]);
const error = ref(null);
const authStore = useAuthStore();

const getHistorySMM = async () => {
  await authStore.fetchUserByToken();
  const url = `${process.env.VUE_APP_BE_API_URL}/history/smm`;
  try {
    const response = await axios.get(url);
    historySMM.value = response.data.data.sort((a, b) => new Date(b.tanggal_order) - new Date(a.tanggal_order));
  } catch (err) {
    error.value = err.response.data.message || "An error occurred";
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

onMounted(() => {
  getHistorySMM();
});
</script>
<template>
  <div class="mb-5">
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <table class="w-full">
        <tr class="h-10 bg-white">
          <th>ID Trx</th>
          <th>Nama Layanan</th>
          <th>Tujuan / Target</th>
          <th>Jumlah</th>
          <th>Harga</th>
          <th>Jumlah Awal</th>
          <th>Jumlah Kurang</th>
          <th>Status</th>
          <th>Tanggal</th>
        </tr>
        <tr
          v-for="item in historySMM"
          :key="item.id"
          class="p-2 m-4 bg-slate-50"
        >
          <th class="w-[8%]">{{ item.id }}</th>
          <th class="text-center w-[20%]">{{ item.service_name }}</th>
          <th class="text-center max-w-[30%] truncate">
            {{ item.data }}
            <button
              @click="copyToClipboard(item.data)"
              class="p-1 ml-2 text-xs text-white bg-blue-500 rounded"
            >
              Copy
            </button>
          </th>
          <th class="text-center w-[7%]">{{ item.quantity }}</th>
          <th class="text-center w-[7%]">{{ formatPrice(item.price) }}</th>
          <th class="text-center w-[7%]">{{ item.start_count }}</th>
          <th class="text-center w-[7%]">{{ item.remains }}</th>
          <th
            :class="[
              'text-center w-[7%] text-white',
              item.status == 'Pending' || item.status == 'pending'
                ? 'bg-yellow-300'
                : item.status == 'Success' || item.status == 'success'
                ? 'bg-green-500'
                : item.status == 'In progress' || item.status == 'in progress'
                ? 'bg-blue-500'
                : 'bg-red-500',
            ]"
          >
            {{ item.status }}
          </th>
          <th class="text-center w-[10%]">
            {{ formatDate(item.tanggal_order) }}
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped></style>
