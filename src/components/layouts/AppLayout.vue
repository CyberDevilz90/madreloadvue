<script setup>
import AppSidebar from "./AppSidebar.vue";
import MainContent from "./MainContent.vue";
import AppFooter from "./AppFooter.vue";

import { useRoute } from "vue-router";
import { computed, ref, watchEffect } from "vue";

const route = useRoute();
const routeName = ref(route.name);
watchEffect(() => (routeName.value = route.name));
const loginRoute = computed(
  () => routeName.value === "Login" || routeName.value === "Daftar"
);
</script>
<template>
  <div class="w-full h-auto min-h-screen flex flex-col gap-0 bg-[#EDF0F2]">
    <AppSidebar v-if="!loginRoute" />
    <main class="flex flex-col">
      <MainContent>
        <slot></slot>
      </MainContent>
      <AppFooter />
    </main>
  </div>
</template>
