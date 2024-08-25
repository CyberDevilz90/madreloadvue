<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { formatPrice } from "@/lib/utils";

const balanceBuzzerpanel = ref(0);
const balanceDigiflazz = ref(0);

async function buzzerBalance() {
  const urlBuzzerpanel = "http://127.0.0.1:5000/utils/admin-buzzer";
  try {
    const response = await axios.get(urlBuzzerpanel);
    balanceBuzzerpanel.value = response.data.data.balance;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function digiflazzBalance() {
  const urlDigiflazz = "http://127.0.0.1:5000/utils/admin-digiflazz";
  try {
    const response = await axios.get(urlDigiflazz);
    balanceDigiflazz.value = response.data.data.deposit;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

onMounted(() => {
  buzzerBalance();
  digiflazzBalance();
});
</script>

<template>
  <div class="flex flex-col items-center m-3">
    <div class="flex">
      <img src="../assets/icons/buzzerpanel.png" class="w-8 h-8" />
      <p>Buzzerpanel : {{ formatPrice(parseInt(balanceBuzzerpanel)) }}</p>
    </div>
    <div class="flex">
      <img src="../assets/icons/digiflazz.png" class="w-6 h-6" />
      <p>DigiFlazz : {{ formatPrice(balanceDigiflazz) }}</p>
    </div>
  </div>
  <div class="flex flex-row justify-center gap-2 p-5">
    <RouterLink to="/admin/set-margin">
      <img
        class="w-[200px]"
        src="../assets/icons/profit.png"
        alt="logo"
      />
      <p class="text-center">Margin Omset</p>
    </RouterLink>
    <RouterLink to="/admin/topup-manual">
      <img
        class="w-[200px]"
        src="../assets/images/madreloadIcon.png"
        alt="logo"
      />
      <p class="text-center">Manage Order</p>
    </RouterLink>
    <RouterLink to="/admin/manage-user">
      <img
        class="w-[200px]"
        src="../assets/images/madreloadIcon.png"
        alt="logo"
      />
      <p class="text-center">Manage User</p>
    </RouterLink>
    <RouterLink to="/admin/topup-manual">
      <img
        class="w-[200px]"
        src="../assets/images/madreloadIcon.png"
        alt="logo"
      />
      <p class="text-center">Top Up Manual</p>
    </RouterLink>
  </div>
</template>
