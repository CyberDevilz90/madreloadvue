<script setup>
import {RouterView} from "vue-router"
import AppLayout from "./components/layouts/AppLayout.vue"
</script>

<template>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </AppLayout>
</template>

<style></style>
