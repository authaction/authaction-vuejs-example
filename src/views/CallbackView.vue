<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthAction } from '@authaction/web-sdk/vue'

const router = useRouter()
const { handleRedirectCallback } = useAuthAction()

onMounted(async () => {
  try {
    await handleRedirectCallback()
  } finally {
    router.replace('/claims')
  }
})
</script>

<template>
  <div class="screen-center">
    <div class="spinner" aria-label="Completing sign in" />
  </div>
</template>
