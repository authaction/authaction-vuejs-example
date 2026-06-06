<script setup lang="ts">
import { useAuthAction } from '@authaction/web-sdk/vue'

const { state, loginWithRedirect, logout } = useAuthAction()
</script>

<template>
  <main>
    <div v-if="state.isLoading">Loading...</div>

    <div v-else-if="state.isAuthenticated">
      <p>Welcome, {{ state.user?.name }}</p>
      <p>Email: {{ state.user?.email }}</p>
      <button @click="logout()">Logout</button>
    </div>

    <div v-else>
      <button @click="loginWithRedirect()">Login</button>
    </div>
  </main>
</template>
