  <script setup>
  import { ref, computed } from 'vue';
  
  const inputValue = ref('');
  const isPasswordVisible = ref(false);
  
  const inputType = computed(() => isPasswordVisible.value ? 'text' : 'password');
  const visibilityIcon = computed(() => isPasswordVisible.value ? '👁️' : '🔒');
  
  function toggleVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
  </script>
  <template>
    <div class="password-toggle">
      <input v-bind="$attrs" v-model="inputValue" :type="inputType" />
      <span @click="toggleVisibility">{{ visibilityIcon }}</span>
    </div>
  </template>
  <style scoped>
  .password-toggle {
    position: relative;
  }
  
  .password-toggle span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  </style>
  