<script setup>

</script>
<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-1/5">
      <img src="../../assets/images/madreloadText.png" alt="madreload" />
    </div>
    <div class="flex flex-col items-center w-1/4 p-4 m-5 bg-white rounded-md">
      <p class="m-3 text-lg font-bold">Masukkan Password Baru</p>
      <form id="loginForm" class="w-full">
        
        <label for="password">Password:</label><br />
        <div
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md password-toggle"
        >
          <input
            class="w-[90%]"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            minlength="8"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            title="Password harus terdiri dari minimal 8 karakter, gabungan huruf kecil, kapital, dan angka"
            required
          />
          <span
            class="toggle-password"
            @click=""
            >👁️</span
          >
        </div>
        <label for="password">Konfirmasi Password:</label><br />
        <div
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md password-toggle"
        >
          <input
            class="w-[90%]"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            minlength="8"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            title="Password harus terdiri dari minimal 8 karakter, gabungan huruf kecil, kapital, dan angka"
            required
          />
          <span
            class="toggle-password"
            @click=""
            >👁️</span
          >
        </div>
        <input
          class="w-full p-3 my-4 font-bold text-center text-white bg-red-500 rounded-md"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  </div>
</template>
