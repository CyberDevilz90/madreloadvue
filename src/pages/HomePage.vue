<script setup>
import { menu } from "../lib/listmenu"
</script>
<template>
  <div class="p-5 mb-5">
    <div class="mb-5 card">
      <div
        class="flex items-center justify-center h-10 bg-blue-500 rounded-b-full"
      >
        <p class="font-bold text-white">Menu</p>
      </div>
      <ul class="flex flex-row flex-wrap justify-center gap-2">
        <li v-for="(category, index) in menu" :key="index">
          <RouterLink :to="category.path">
            <img class="w-[200px]" src="../assets/images/madreloadIcon.png" alt="logo" />
            <p class="text-center">{{ category.name }}</p>
          </RouterLink>
        </li>
      </ul>
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
