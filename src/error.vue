<script setup lang="ts">
const error = useError()

const errorCode = computed(() => (
  error.value instanceof Error
    ? 500
    : (error.value as any)?.statusCode || 500
))

const errorMessage = computed(() => (
  error.value instanceof Error
    ? 'Something went wrong'
    : (error.value as any)?.statusMessage || 'Something went wrong'
))

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error">
    <h1 class="code">
      {{ errorCode }}
    </h1>
    <p class="message">
      {{ errorMessage }}
    </p>
    <button @click="handleError">
      Back to home
    </button>
  </div>
</template>
