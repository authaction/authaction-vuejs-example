<template>
  <div>
    <h1>{{ msg }}</h1>
    <div v-if="state.isLoading">Loading...</div>
    <div v-else-if="state.isAuthenticated">Logged in as: {{ state.user?.email }}</div>
    <button v-if="!state.isAuthenticated && !state.isLoading" @click="loginWithRedirect()">Login</button>
    <button v-if="state.isAuthenticated" @click="logout()">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthAction } from '@authaction/web-sdk/vue'

const msg = 'Welcome to AuthAction!'
const { state, loginWithRedirect, logout } = useAuthAction()
</script>
