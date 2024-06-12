<template>
  <div class="w-[25%]">
    <div>
      <p>{{ props.label }}</p>
      <div
        class="flex items-center w-full h-10 mt-2 text-sm font-medium rounded-md bg-slate-300"
      >
        <p v-if="!props.loading" :title="props.value" class="ml-4">
          {{
            props.value.length > 25
              ? props.value.substring(0, 25) + " ...."
              : props.value
          }}
        </p>
        <Skeleton v-else class="w-full h-10" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Skeleton from "./Skeleton.vue";

const props = defineProps({
  label: String,
  loading: Boolean,
  value: String,
});
</script>
