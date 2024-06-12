<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps } from "vue";
defineProps(["src", "objectFit"]);
</script>

<template>
  <div class="relative h-40 overflow-hidden rounded-md w-80">
    <BImg
      :src="src"
      :class="[
        ' w-full  h-full',
        objectFit === 'contain'
          ? ' object-contain'
          : objectFit === 'fill'
          ? ' object-fill'
          : ' object-cover',
      ]"
    />
  </div>
</template>
