<script setup>
import AppHeader from "./AppHeader.vue";
import SideBar from "./SideBar.vue";
import MainContent from "./MainContent.vue";
import AppFooter from "./AppFooter.vue";

</script>
<template>
  <div class="flex items-start justify-start w-full gap-0">
    <SideBar />
    <div class="w-full h-auto min-h-screen flex flex-col gap-0 bg-[#EDF0F2]">
      <AppHeader />
      <main class="flex flex-col">
        <MainContent>
          <slot></slot>
        </MainContent>
        <AppFooter />
      </main>
    </div>
  </div>
</template>
