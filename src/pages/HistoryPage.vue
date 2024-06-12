<script setup>
import { ref } from "vue";
import HistoryPPOB from "./history/HistoryPPOB.vue";
import HistorySocialMedia from "./history/HistorySocialMedia.vue";

const isPulsa = ref(true);
const isSocial = ref(false);

function PPOB() {
  isPulsa.value = true;
  isSocial.value = false;
}

function SocialMedia() {
  isPulsa.value = false;
  isSocial.value = true;
}

</script>
<template>
  <div>
    <div class="flex justify-center p-2 m-2">
      <input
        :class="['p-2 rounded-md', isPulsa ? 'bg-white font-bold' : 'bg-slate-400 text-gray-300']"
        type="button"
        value="PPOB"
        @click="PPOB"
      />
      <input
        :class="['p-2 rounded-md', isSocial ? 'bg-white font-bold ' : 'bg-slate-400 text-gray-300']"
        type="button"
        value="Social Media"
        @click="SocialMedia"
      />
    </div>
    <HistoryPPOB v-if="isPulsa" />
    <HistorySocialMedia v-else />
  </div>
</template>
