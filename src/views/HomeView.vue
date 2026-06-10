<script setup lang="ts">
import { computed } from 'vue'
import { useAuthAction } from '@authaction/web-sdk/vue'

const { state, loginWithRedirect, logout } = useAuthAction()

const profileFields = computed(() => {
  const u = state.user
  if (!u) return []
  return [
    { label: 'Name', value: u.name },
    { label: 'Email', value: u.email },
    { label: 'Subject', value: u.sub },
  ].filter((f) => f.value)
})

const avatarInitial = computed(() => state.user?.name?.[0]?.toUpperCase() ?? 'U')
const rawClaims = computed(() => JSON.stringify(state.user, null, 2))
</script>

<template>
  <div class="screen-center" v-if="state.isLoading">
    <div class="spinner" aria-label="Loading" />
  </div>

  <div class="app" v-else>
    <main class="main">
      <!-- Authenticated: profile card -->
      <div class="card" v-if="state.isAuthenticated">
        <div class="card-header">
          <img
            v-if="state.user?.picture"
            :src="state.user.picture"
            :alt="state.user?.name"
            class="avatar"
          />
          <div v-else class="avatar-placeholder">{{ avatarInitial }}</div>
          <h1 class="profile-name">{{ state.user?.name }}</h1>
          <p class="profile-email">{{ state.user?.email }}</p>
        </div>

        <div class="card-body">
          <h2 class="section-title">Profile</h2>
          <dl class="info-list">
            <div v-for="field in profileFields" :key="field.label" class="info-row">
              <dt class="info-label">{{ field.label }}</dt>
              <dd class="info-value">{{ field.value }}</dd>
            </div>
          </dl>
          <details class="raw-token">
            <summary>Raw claims</summary>
            <pre class="raw-token-content">{{ rawClaims }}</pre>
          </details>
        </div>

        <div class="card-footer">
          <button class="btn btn-outline" @click="logout()">Sign out</button>
        </div>
      </div>

      <!-- Unauthenticated: login card -->
      <div class="card card-centered" v-else>
        <div class="brand-icon" aria-hidden="true">A</div>
        <h1 class="login-title">Welcome to AuthAction</h1>
        <p class="login-subtitle">Sign in to continue to your account.</p>
        <button class="btn btn-primary" @click="loginWithRedirect()">Sign in</button>
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

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

/* Card */

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  width: 100%;
  max-width: 480px;
  overflow: hidden;
}

.card-centered {
  text-align: center;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--color-border);
  gap: 8px;
}

.card-body {
  padding: 24px 32px;
}

.card-footer {
  padding: 16px 32px 28px;
  display: flex;
  justify-content: center;
}

/* Avatar */

.avatar,
.avatar-placeholder {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 4px;
}

.avatar {
  object-fit: cover;
  border: 2px solid var(--color-border);
}

.avatar-placeholder {
  background-color: var(--color-avatar-bg);
  color: var(--color-avatar-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
}

/* Profile */

.profile-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
}

.profile-email {
  font-size: 14px;
  color: var(--color-text-muted);
}

.section-title {
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

/* Info list */

.info-list {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.info-value {
  font-size: 14px;
  color: var(--color-text);
  word-break: break-all;
}

/* Raw token */

.raw-token {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.raw-token summary {
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  user-select: none;
  background: var(--color-raw-bg);
}

.raw-token summary:hover {
  color: var(--color-text);
}

.raw-token-content {
  padding: 14px;
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas,
    'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-raw-bg);
  overflow-x: auto;
  border-top: 1px solid var(--color-border);
}

/* Brand icon */

.brand-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}

.login-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
}

.login-subtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

/* Buttons */

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
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  width: 100%;
  padding: 12px;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.btn-outline:hover {
  border-color: #cbd5e0;
  color: var(--color-text);
}
</style>
