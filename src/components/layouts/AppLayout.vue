<script setup>
import AppHeader from "./AppHeader.vue";
import SideBar from "./SideBar.vue";
import MainContent from "./MainContent.vue";
import AppFooter from "./AppFooter.vue";

// import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, watchEffect } from "vue";

// const store = useStore();
const route = useRoute();
const routeName = ref(route.name);
watchEffect(() => (routeName.value = route.name));
const loginRoute = computed(() => routeName.value === "Login" || routeName.value === "Daftar");

</script>
<template>
  <div class="flex items-start justify-start w-full gap-0">
    <SideBar v-if="!loginRoute" />
    <div class="w-full h-auto min-h-screen flex flex-col gap-0 bg-[#EDF0F2]">
      <AppHeader v-if="!loginRoute" />
      <main class="flex flex-col">
        <MainContent>
          <slot></slot>
        </MainContent>
        <AppFooter />
      </main>
    </div>
  </div>
</template>
