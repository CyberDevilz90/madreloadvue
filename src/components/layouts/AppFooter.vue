<script setup>
import { currentYear } from "@/lib/utils";
</script>
<template>
  <footer class="flex self-center justify-center w-full">
    <div class="w-full h-full bg-white rounded-lg ">
      <div class="flex flex-col items-center justify-center gap-1">
        <div class="mt-2">
          <i class="text-sm mdi mdi-whatsapp"></i>
          <span class="text-xs"> Whatsapp : 085866294698</span>
        </div>
        <div>
          <i class="text-sm mdi mdi-email"></i>
          <span class="text-xs"> Email : ahmadmahmudi2000@gmail.com</span>
        </div>
        <div>
          <i class="text-sm mdi mdi-google-maps"></i>
          <span class="text-xs">
            Alamat : Kel. Kalangan, Kec. Pedan, Kab. Klaten, Provinsi Jawa
            Tengah</span
          >
        </div>
        <div class="mt-2">
          <p class="text-xs text-center">
            Copyright MAD Group {{ currentYear }}
          </p>
        </div>
        <div class="mb-4">
          <p class="text-xs text-center">Created with love by Ahmad Mahmudi</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.card {
  border: 1px solid #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: whitesmoke;
}
</style>
