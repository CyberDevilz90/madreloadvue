<script setup>
import AppHeader from "./AppHeader.vue";
import SideBar from "./SideBar.vue";
import MainContent from "./MainContent.vue";

import { ref, onMounted, onUnmounted } from "vue";

const currentYear = ref(new Date().getFullYear());

const updateYear = () => {
  currentYear.value = new Date().getFullYear();
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(updateYear, 86400000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<template>
  <div class="flex items-start justify-start w-full gap-0">
    <SideBar />
    <div class="w-full h-auto min-h-screen flex flex-col gap-0 bg-[#EDF0F2]">
      <AppHeader />
      <main>
        <MainContent>
          <slot></slot>
        </MainContent>
        <footer></footer>
      </main>
    </div>
  </div>
</template>
