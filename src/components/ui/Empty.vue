<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import FlexBox from "./FlexBox.vue";
import { defineProps } from "vue";
defineProps(["text"]);
</script>

<template>
  <FlexBox full flex-col jus-center it-center gap="small">
    <i class="text-gray-500 mdi mdi-delete-empty text-7xl"></i>
    <span class="text-gray-500">{{ text }}</span>
  </FlexBox>
</template>
