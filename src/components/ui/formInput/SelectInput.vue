<script setup>
import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
  defineProps,
  defineModel,
  defineEmits,
} from "vue";
import gsap from "gsap";
import { enableAnimations } from "../../../lib/settings";
import Fuse from "fuse.js";

const props = defineProps([
  "options",
  "modelValue",
  "placeholder",
  "size",
  "textField",
  "valueField",
  "maxSelectedDisplayed",
  "search",
  "disabled",
]);
const model = defineModel();
const emits = defineEmits(["change"]);

const showOptions = ref(false);
const optionsArray = ref(props.options);
const selectRef = ref();
const optionRef = ref();
const selectedOptionText = ref(model.value || "");
const selectedOptionValue = ref(model.value);
const placeTop = ref(false);
const selectInputSize =
  props.size === "sm"
    ? "tw-h-8"
    : props.size === "md"
    ? "tw-h-11"
    : props.size === "lg"
    ? "tw-h-16"
    : props.size === "xl"
    ? "tw-h-20"
    : "tw-h-full";

const enter = (el, done) => {
  gsap.set(el, { y: placeTop.value ? 10 : -10, opacity: 0 });
  gsap
    .timeline({ paused: true, onComplete: done })
    .to(el, {
      y: 0,
      opacity: 1,
      duration: !enableAnimations ? 0 : 0.4,
      ease: "power4.out",
    })
    .play();
};

const leave = (el, done) => {
  gsap
    .timeline({ paused: true, onComplete: done })
    .to(el, {
      y: placeTop.value ? 10 : -10,
      duration: !enableAnimations ? 0 : 0.4,
      opacity: 0,
      ease: "power4.out",
    })
    .play();
};

const handleClickOutside = (event) => {
  const selectElement = selectRef.value;
  if (showOptions.value && !selectElement.contains(event.target)) {
    showOptions.value = false;
    placeTop.value = false;
  }
};

const placingOptions = () => {
  const el = optionRef.value;
  const windowInnerHeight = window.innerHeight;
  const getRect = el.getBoundingClientRect();
  const yPosition = getRect.bottom;
  placeTop.value = yPosition > windowInnerHeight;
};

const openOptions = () => {
  showOptions.value = !showOptions.value;

  if (!showOptions.value) {
    placeTop.value = false;
  }

  if (showOptions.value) {
    nextTick(() => {
      placingOptions();
    });
  }
};

const selectOption = (text, value, options) => {
  selectedOptionText.value = text;
  selectedOptionValue.value = value;
  const optionsValue = options.filter(
    (option) => option[props.valueField || "value"] === value
  )[0][props.valueField || "value"];
  model.value = optionsValue;

  emits("change", optionsValue);
};

const filterOptions = (text, field) => {
  if (!text) return (optionsArray.value = props.options);
  const fuse = new Fuse(props.options, { keys: [field] });

  optionsArray.value = fuse.search(text).map((result) => result?.item);
};

onMounted(() => {
  window.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleClickOutside);
});

watchEffect(() => {
  optionsArray.value = props.options;

  if (!model.value) {
    selectedOptionValue.value = "";
    selectedOptionText.value = "";
  } else {
    selectedOptionValue.value = model.value;
  }

  if (!props.modelValue) {
    return selectedOptionText.value;
  }

  return (selectedOptionText.value = props.options.filter(
    (option) => option[props.valueField || "value"] == model.value
  )[0][props.textField || "text"]);
});
</script>

<template>
  <div
    ref="selectRef"
    @click.self="!disabled && openOptions()"
    :class="[
      'tw-w-full tw-border  tw-rounded-md tw-relative tw-px-2 tw-flex tw-justify-between tw-items-center tw-cursor-pointer',
      !disabled ? 'tw-border-slate-500' : 'tw-border-slate-300',
      selectInputSize,
    ]"
  >
    <span
      @click="!disabled && openOptions()"
      :class="[
        'tw-text-sm tw-select-none',
        !disabled ? 'tw-text-gray-600' : 'tw-text-gray-400',
      ]"
    >
      {{
        selectedOptionText.length
          ? selectedOptionText.length > 35
            ? selectedOptionText.substring(0, 32) + "..."
            : selectedOptionText
          : props.placeholder
          ? props.placeholder
          : "Pilih"
      }}
    </span>
    <span
      @click="!disabled && openOptions()"
      :class="[
        'mdi mdi-chevron-down tw-text-xl tw-transition-all tw-duration-300 tw-ease-in-out',
        !disabled ? 'tw-text-gray-600' : 'tw-text-gray-400',
        showOptions && 'tw-rotate-180',
      ]"
    ></span>
    <Transition @enter="enter" @leave="leave">
      <div
        ref="optionRef"
        v-if="showOptions"
        :class="[
          'tw-w-full tw-max-h-60 tw-z-50 tw-overflow-auto tw-shadow-xl tw-select-none tw-absolute tw-flex tw-flex-col tw-gap-1 tw-px-2 tw-py-2 tw-bg-white tw-border tw-border-gray-400 tw-rounded-md tw-left-0',
          placeTop ? 'tw-bottom-[120%]' : 'tw-top-[120%]',
        ]"
      >
        <BFormInput
          v-if="props.search"
          @input="filterOptions($event, props.textField)"
          class="tw-h-7 tw-mb-3 tw-mt-2 placeholder:tw-text-sm tw-text-sm"
          placeholder="cari ..."
        />
        <div
          @click="openOptions"
          v-if="props.options.length"
          class="tw-w-full tw-flex tw-flex-col tw-gap-0"
          v-for="option in optionsArray"
          :key="option[props.valueField || 'value']"
        >
          <span
            @click="
              selectOption(
                option[props.textField || 'text'],
                option[props.valueField || 'value'],
                options
              )
            "
            :class="[
              'tw-px-3 tw-py-2 tw-text-xs tw-rounded-sm hover:tw-bg-[#01579b] hover:tw-text-white tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer tw-text-start',
              option[props.valueField || 'value'] === selectedOptionValue &&
                'tw-bg-[#01579b] tw-text-white tw-font-semibold',
            ]"
          >
            {{ option[props.textField || "text"] }}
          </span>
        </div>
        <div
          v-else
          class="tw-w-full tw-h-14 tw-text-sm tw-flex tw-justify-center tw-items-center tw-text-slate-600"
        >
          Tidak ada data pilihan
        </div>
      </div>
    </Transition>
  </div>
</template>
