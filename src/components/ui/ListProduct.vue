<template>
  <div>
    <div v-if="selectedProducts.length">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div
          v-for="product in selectedProducts"
          :key="product.buyer_sku_code"
          :class="[
            'p-4 bg-white rounded shadow-md hover:cursor-pointer',
          ]"
          @click="selectProduct(product)"
        >
          <div
            class="bg-gradient-to-r from-cyan-500 to-blue-500 mt-[-1rem] text-center rounded-b-full h-8 mb-4 flex items-center justify-center"
          >
            <p class="text-sm font-bold text-white">Rp {{ product.price }}</p>
          </div>
          <h3
            :class="['mb-2 font-semibold text']"
          >
            {{ product.product_name }}
          </h3>
          <div v-if="product.selected" class="flex justify-center">
            <div class="absolute mt-[-10px] bg-green-500 rounded-t-full h-7 w-[10%]">
              <p class="font-bold text-center text-slate-200">
                TERPILIH
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Produk Kosong</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedProducts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectProduct(product) {
      product.selected = !product.selected;
      this.$emit("select", product.buyer_sku_code);
    },
  },
};
</script>
