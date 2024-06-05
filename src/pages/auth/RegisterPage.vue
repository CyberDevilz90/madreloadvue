<script setup>
import PasswordInput from "@/components/ui/PasswordInput.vue";
import { ref } from "vue";
import { useAuthStore } from "@/store/modules/auth";
import router from "@/router";

const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const telp = ref("");
const errorMessage = ref("");

const register = async (event) => {
  event.preventDefault();
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      telp: telp.value,
    });
    router.push({ name: "Home" });
  } catch (error) {
    console.error("Register error:", error); // Tampilkan error ke konsol untuk pemecahan masalah
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "An error occurred.";
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-1/5">
      <img src="../../assets/images/madreloadText.png" alt="madreload" />
    </div>
    <div class="flex flex-col items-center w-1/4 p-4 m-5 bg-white rounded-md">
      <p class="m-3 text-lg font-bold">Daftar Akun Baru</p>
      <p v-if="errorMessage" class="text-center text-red-500">
        {{ errorMessage }}
      </p>
      <form id="loginForm" class="w-full">
        <label for="name">Nama:</label>
        <input
          v-model="name"
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
          type="text"
          name="name"
          required
          placeholder="Nama"
        /><br />
        <label for="email">Email:</label><br />
        <input
          v-model="email"
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
          type="email"
          name="email"
          required
          placeholder="email@example.com"
        /><br />
        <label for="nomor">No HP:</label>
        <input
          v-model="telp"
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
          type="text"
          name="nomor"
          required
          placeholder="08xxxxxxxxxx"
        /><br />
        <label for="password">Password:</label><br />
        <div
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md password-toggle"
        >
          <password-input
            name="password"
            v-model="password"
            placeholder="password"
            minlength="8"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            title="Password harus terdiri dari minimal 8 karakter, gabungan huruf kecil, kapital, dan angka"
            required
          />
        </div>
        <input
          class="w-full p-3 my-4 font-bold text-center text-white bg-red-500 rounded-md"
          type="submit"
          value="Daftar"
          @click="register"
        />
      </form>
      <p class="text-sm">
        Sudah punya akun?
        <span><router-link class="text-red-500" to="/auth/login">Login</router-link></span>
      </p>
    </div>
  </div>
</template>
