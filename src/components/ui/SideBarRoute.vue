<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  routeName: {
    type: String,
  },
  routerClass: {
    type: [String, Array],
  },
  iconClass: {
    type: String,
  },
  destination: {
    type: String,
  },
});
</script>

<template>
  <div id="navButt" v-wave class="w-full overflow-hidden">
    <RouterLink :to="props.destination" :class="props.routerClass">
      <div class="flex items-center justify-start gap-4">
        <i id="navButtIcon" :class="props.iconClass"></i>
        <span id="navButtIcon" class="font-bold md:hidden lg:inline">{{ props.routeName }}</span>
      </div>
    </RouterLink>
  </div>
</template>
