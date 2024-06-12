<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps } from "vue";

defineProps(["informations"]);
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-8 text-xs text-base lg:">
    <h4>Keterangan Warna pada tombol :</h4>
    <div class="flex flex-col justify-center gap-4">
      <div
        v-for="inform in informations"
        :key="inform.information"
        class="flex items-center gap-2 gap-6 lg:"
      >
        <span
          :class="[
            'lg: w-36  w-16  pt-[0.28rem]  pb-[0.28rem]  rounded-md  text-center lg: text-sm  text-[0.6rem]',
            inform.buttonColor,
            inform?.buttonTextColor || ' text-black',
          ]"
        >
          {{ inform.buttonText }}
        </span>
        <span>=</span>
        <span>
          {{ inform.information }}
        </span>
      </div>
    </div>
  </div>
</template>
