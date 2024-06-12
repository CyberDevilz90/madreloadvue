<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps } from "vue";

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  main = true,
  noHeader = false,
  noMainCenter = true,
  noSubheader = false,
} = defineProps({
  main: Boolean,
  noHeader: Boolean,
  noMainCenter: Boolean,
  noSubheader: Boolean,
  dense: Boolean,
});
</script>
<template>
  <div
    :class="[
      ' w-full  flex  gap-6  flex-col  px-4  bg-white  rounded-lg',
      !noHeader && !noSubheader ? '  pb-10' : '',
    ]"
  >
    <div
      v-if="!noHeader"
      :class="[
        ' w-full  mt-6  flex  items-center',
        !noMainCenter ? ' justify-center' : ' justify-start',
        dense ? 'lg: h-8  h-4' : 'lg: h-16  h-6',
      ]"
    >
      <span
        :class="[' font-bold lg: text-2xl  text-xl', !main && ' text-blue-500']"
      >
        <slot name="header"></slot>
      </span>
    </div>
    <hr v-if="!noHeader" />
    <div
      v-if="!noSubheader"
      :class="[
        ' w-full  flex  justify-center  items-center',
        dense ? ' h-6' : ' h-16',
      ]"
    >
      <span
        class="text-xs text-lg font-bold text-center text-red-500 lg: text-start"
      >
        <slot name="subheader"></slot>
      </span>
    </div>
    <hr v-if="!noSubheader" />
    <div class="flex flex-wrap justify-center w-full gap-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>
