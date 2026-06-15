<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthAction } from '@authaction/web-sdk/vue'

const router = useRouter()
const { state, logout } = useAuthAction()

watch(
  () => [state.isLoading, state.isAuthenticated],
  ([loading, auth]) => {
    if (!loading && !auth) router.replace('/')
  },
)

const rawClaims = computed(() => {
  const { access_token, profile, ...claims } = (state.user as Record<string, unknown>) ?? {}
  return JSON.stringify(claims, null, 2)
})

const initials = computed(() =>
  state.user?.name?.[0]?.toUpperCase() ?? 'U',
)
</script>

<template>
  <div v-if="state.isLoading || !state.isAuthenticated" class="screen-center">
    <div class="spinner" aria-label="Loading" />
  </div>

  <div v-else class="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon-sm">A</span>
        <span class="navbar-title">AuthAction</span>
      </div>
      <div class="navbar-actions">
        <span class="demo-badge">Demo App</span>
        <div class="avatar-sm">{{ initials }}</div>
        <button class="btn btn-ghost" @click="logout()">Sign out</button>
      </div>
    </nav>

    <main class="claims-main">
      <div class="claims-card">
        <h1 class="claims-title">Raw Claims</h1>
        <pre class="claims-content">{{ rawClaims }}</pre>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.screen-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 60px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon-sm {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
}

.navbar-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.demo-badge {
  font-size: 11px;
  font-weight: 600;
  color: #92400e;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  padding: 3px 8px;
  border-radius: 20px;
  letter-spacing: 0.02em;
}

.avatar-sm {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.claims-main {
  flex: 1;
  padding: 40px 24px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.claims-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.claims-title {
  margin: 0;
  padding: 20px 24px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-raw-bg);
}

.claims-content {
  margin: 0;
  padding: 24px;
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: var(--color-text);
  background: var(--color-surface);
  overflow-x: auto;
  white-space: pre;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-btn);
  border: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-muted);
  border: none;
  padding: 8px 16px;
}

.btn-ghost:hover {
  color: var(--color-text);
  background-color: var(--color-bg);
  border-radius: var(--radius-btn);
}
</style>
