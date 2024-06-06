<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";

const auth = useAuthStore()
const route = useRoute();
const currentTime = ref(new Date().toLocaleTimeString());
let intervalId;

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
};
onMounted(() => {
  intervalId = setInterval(updateTime, 1000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<template>
  <header
    class="flex flex-row items-center justify-between w-full h-16 p-6 bg-white lg:tw-flex tw-px-4 2xl:hidden"
  >
    <div class="flex">
      <p class="font-bold text-blue-800">
        {{ currentTime }}
      </p>
    </div>
    <div>
      <p class="font-bold text-blue-800">
        {{ route.name }}
      </p>
    </div>
    <div class="flex items-center gap-6">
      <div>
        <p class="font-bold text-blue-800">Rp {{auth.user.saldo}}</p>
      </div>
      <div>
        <p class="font-bold text-blue-800">{{auth.user.name}}</p>
      </div>
    </div>
  </header>
</template>
