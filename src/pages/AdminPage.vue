<script setup>

</script>

<template>
    <div class="flex flex-row justify-center gap-2 p-5">
        <RouterLink to="/admin/set-margin">
            <img class="w-[200px]" src="../assets/images/madreloadIcon.png" alt="logo">
            <p class="text-center">Margin Omset</p>
        </RouterLink>
        <RouterLink to="/admin/manage-user">
            <img class="w-[200px]" src="../assets/images/madreloadIcon.png" alt="logo">
            <p class="text-center">Manage User</p>
        </RouterLink>
        <RouterLink to="/admin/topup-manual">
            <img class="w-[200px]" src="../assets/images/madreloadIcon.png" alt="logo">
            <p class="text-center">Top Up Manual</p>
        </RouterLink>
    </div>
</template>