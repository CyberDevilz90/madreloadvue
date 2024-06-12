<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "./Loader.vue";

const props = defineProps({
  icon: String,
  text: String,
  full: Boolean,
  trigger: Function,
  url: String,
  replaceUrl: String,
  active: {
    type: Boolean,
    default: true,
  },
});
const router = useRouter();
const loading = ref(false);

const routeLink = async () => {
  if (props.trigger) {
    loading.value = true;
    await props.trigger();
    loading.value = false;
    return router.replace(props.replaceUrl);
  }

  return router.push(props.url);
};
</script>

<template>
  <div
    @click="active ? routeLink() : null"
    :class="[
      ' h-48 lg: min-h-[200px]  flex  flex-col  justify-center  items-center  gap-2  px-6  py-8  rounded-lg  duration-300  ease-out  cursor-pointer',
      full ? ' w-full' : ' w-full lg: w-[206px]',
      !active
        ? ' bg-gray-50  text-gray-400  border  border-slate-300'
        : ' bg-white hover: text-white hover: scale-105  text-gray-800 hover: bg-sky-400  shadow-lg',
    ]"
  >
    <i :class="['mdi  text-6xl', icon]" v-if="!loading"></i>
    <Loader v-else />
    <span class="text-lg font-semibold text-center">{{ text }}</span>
  </div>
</template>
