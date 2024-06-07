<script setup>
import { ref } from "vue";
import HistoryPPOB from "./history/HistoryPPOB.vue";
import HistorySocialMedia from "./history/HistorySocialMedia.vue";

const isPulsa = ref(true);

function History(){
    isPulsa.value = !isPulsa.value
}

</script>
<template>
  <div>
    <div>
      <input type="button" value="PPOB" @click="History" />
      <input type="button" value="Social Media" />
    </div>
    <HistoryPPOB v-if="isPulsa" />
    <HistorySocialMedia v-else />
  </div>
</template>
