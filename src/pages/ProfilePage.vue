<script setup>
// eslint-disable-next-line
import { useAuthStore } from "@/store/modules/auth";

const auth = useAuthStore();
</script>
<template>
   <div class="flex flex-row p-10 justify-evenly">
      <div class="w-[40%] bg-slate-200 rounded-lg p-5">
         <p class="mb-3 font-bold">Profile</p>
         <div>
            <p class="mb-1 text-sm">Nama</p>
            <input
               type="text"
               :value="auth.user.name"
               class="w-full p-1 mb-3 text-sm rounded-md"
            />
            <p class="mb-1 text-sm">Email</p>
            <input
               type="text"
               :value="auth.user.email"
               class="w-full p-1 mb-3 text-sm rounded-md"
            />
            <p class="mb-1 text-sm">No Hp/Whatsapp</p>
            <input
               type="text"
               :value="auth.user.telp"
               class="w-full p-1 mb-3 text-sm rounded-md"
            />
            <p class="mb-1 text-sm">Password</p>
            <input type="text" class="w-full p-1 mb-3 text-sm rounded-md" />
            <div class="w-full mt-2">
               <p
                  class="py-1 font-bold text-center text-white bg-blue-600 rounded-lg"
               >
                  Simpan Perubahan
               </p>
            </div>
         </div>
      </div>
      <div class="w-[40%] bg-slate-200 rounded-lg p-5 h-80">
         <p class="mb-3 font-bold">Ubah Password</p>
         <div>
            <p class="mb-1 text-sm">Password Saat ini</p>
            <input type="text" class="w-full p-1 mb-3 text-sm rounded-md" />
            <p class="mb-1 text-sm">Password Baru</p>
            <input type="text" class="w-full p-1 mb-3 text-sm rounded-md" />
            <p class="mb-1 text-sm">Konfirmasi Password Baru</p>
            <input type="text" class="w-full p-1 mb-3 text-sm rounded-md" />
            <div class="w-full mt-2">
               <p
                  class="py-1 font-bold text-center text-white bg-blue-600 rounded-lg"
               >
                  Simpan Password Baru
               </p>
            </div>
         </div>
      </div>
   </div>
</template>
