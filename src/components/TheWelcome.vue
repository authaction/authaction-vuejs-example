<template>
  <div>
    <h1>{{ msg }}</h1>
    <div v-if="userEmail">Logged in as: {{ userEmail }}</div>
    <button v-if="!userEmail" @click="handleLogin">Login</button>
    <button v-if="userEmail" @click="handleLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '../services/AuthService'
import { onMounted } from 'vue'

const msg = ref('Welcome to AuthAction!')
const userEmail = ref<string | null>(null)

const initializeUser = async () => {
  try {
    const user = await authService.getUser() // Fetch user details if available
    userEmail.value = user?.profile?.email || ''
  } catch (error) {
    console.error('Failed to fetch user details', error)
  }
}

const handleLogin = async () => {
  try {
    await authService.login()
  } catch (error) {
    console.error('Login failed', error)
  }
}

const handleLogout = async () => {
  try {
    await authService.logout()
    userEmail.value = null // Clear user email on logout
  } catch (error) {
    console.error('Logout failed', error)
  }
}

onMounted(async () => {
  await initializeUser()
})
</script>
