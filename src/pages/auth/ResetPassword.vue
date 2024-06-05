<script setup>

</script>
<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-1/5">
      <img src="../../assets/images/madreloadText.png" alt="madreload" />
    </div>
    <div class="flex flex-col items-center w-1/4 p-4 m-5 bg-white rounded-md">
      <p class="m-3 text-lg font-bold">Reset Password</p>
      <form id="loginForm" class="w-full">
        <label for="email">Email:</label><br />
        <input
          class="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
          type="email"
          id="email"
          name="email"
          required
          placeholder="email@example.com"
        /><br />
      </form>
    </div>
  </div>
</template>
