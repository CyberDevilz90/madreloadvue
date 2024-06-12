<script setup>
import { useAlert } from "@/src/store/alert";
import gsap from "gsap";

defineProps(["message", "variant", "dissmissCountDown", "countDown"]);
const alert = useAlert();

const enter = (el, done) => {
  gsap.set(el, { xPercent: 100, opacity: 0 });
  gsap
    .timeline({ paused: true, onComplete: done })
    .to(el, { xPercent: 0, duration: 0.6, opacity: 1, ease: "power4.out" })
    .play();
};

const leave = (el, done) => {
  gsap
    .timeline(el, { paused: true, onComplete: done })
    .to(el, {
      yPercent: -120,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
    })
    .play();
};
</script>

<template>
  <Transition @enter="enter" @leave="leave" name="alert-transition">
    <BAlert
      v-model="alert.dissmissCountDown"
      dismissible
      :variant="variant"
      @close-countdown="countDown = $event"
      class="fixed z-50 flex flex-col gap-4 top-3 right-2"
    >
      <span class="text-sm">Message : </span>
      <div
        class="h-auto overflow-auto bg-white border rounded-lg w-80 max-h-32 border-slate-300 bg-opacity-45"
      >
        <p class="px-2 py-3 text-xs capitalize text-slate-700">
          {{ message }}
        </p>
      </div>
      <BProgress
        :variant="variant"
        :max="alert.dissmissCountDown"
        :value="countDown"
        height="4px"
      />
    </BAlert>
  </Transition>
</template>
