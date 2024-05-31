
<script>
export default {
  props: {
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
  },
};
</script>

<template>
  <div id="navButt" v-wave class="w-full overflow-hidden">
    <RouterLink :to="destination" :class="routerClass">
      <div class="flex items-center justify-start gap-4">
        <i id="navButtIcon" :class="iconClass"></i>
        <span id="navButtIcon" class="font-bold">{{ routeName }}</span>
      </div>
    </RouterLink>
  </div>
</template>
