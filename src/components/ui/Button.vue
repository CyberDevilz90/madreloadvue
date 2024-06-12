<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useAlert } from "@/src/store/alert";

const props = defineProps({
  loading: Boolean,
  disabled: Boolean,
  fallbackUrl: String,
  trigger: Function,
  loadingMode: String,
});
const buttonLoading = ref(props.loading || false);

const router = useRouter();
const alert = useAlert();

const change = async () => {
  buttonLoading.value = true;
  try {
    await props.trigger();
    if (props.fallbackUrl) router.push(props.fallbackUrl);
  } catch (error) {
    alert.setMessage(error.message, "danger");
  }
  buttonLoading.value = false;
};
</script>

<template>
  <BButton
    size="sm"
    @click="change"
    :disabled="disabled"
    class="capitalize bg-blue-500 border-none rounded-sm te-text-white"
  >
    <slot v-if="!buttonLoading"></slot>
    <div v-if="buttonLoading" class="flex items-center justify-center gap-2">
      <BSpinner small />
      <span v-if="loadingMode !== 'icon'">loading</span>
    </div>
  </BButton>
</template>
