<script setup>
import { defineProps } from "vue";
defineProps({
  full: Boolean,
  hFull: Boolean,
  itBetween: Boolean,
  itCenter: Boolean,
  itEnd: Boolean,
  jusBetween: Boolean,
  jusCenter: Boolean,
  jusEnd: Boolean,
  flexCol: Boolean,
  gap: String,
  wrap: Boolean,
});
</script>

<template>
  <div
    :class="[
      'flex',
      full ? 'w-full' : 'lg:w-auto w-full',
      hFull ? 'h-[100vh]' : '',
      wrap && 'flex-wrap',
      jusCenter
        ? 'justify-center'
        : jusEnd
        ? 'justify-end'
        : jusBetween
        ? 'justify-between'
        : 'justify-start',
      itCenter
        ? 'items-center'
        : itEnd
        ? 'items-end'
        : itBetween
        ? 'justify-between'
        : 'items-start',
      gap === 'small'
        ? 'gap-1'
        : gap === 'medium'
        ? 'gap-4'
        : gap === 'large'
        ? 'gap-6'
        : gap === 'extra large'
        ? 'gap-8'
        : 'gap-4',
      flexCol ? 'flex-col' : 'flex-row',
    ]"
  >
    <slot></slot>
  </div>
</template>
