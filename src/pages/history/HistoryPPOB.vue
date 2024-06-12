<script setup>
import Table from "../../components/ui/table/Table";
import { tableHistoryPPOB } from "../../model/table/index.js";
import { ref, onMounted } from "vue";

const dataHistory = ref([]);
const tableKey = ref(0);

onMounted(() => {});
</script>
<template>
  <div>
    History PPOB
    <Table
      :table-data="dataHistory"
      :key="tableKey"
      :columns="tableHistoryPPOB"
    />
  </div>
</template>
