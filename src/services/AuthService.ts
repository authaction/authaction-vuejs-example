import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

const oidcConfig = {
  authority: `https://${import.meta.env.VITE_AUTHACTION_TENANT_DOMAIN}`,
  client_id: import.meta.env.VITE_AUTHACTION_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_AUTHACTION_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: import.meta.env.VITE_AUTHACTION_LOGOUT_REDIRECT_URI,
  userStore: new WebStorageStateStore({ store: window.localStorage })
}

export class AuthService {
  private userManager = new UserManager(oidcConfig)

  login() {
    return this.userManager.signinRedirect()
  }

  logout() {
    return this.userManager.signoutRedirect()
  }

  handleCallback() {
    return this.userManager.signinRedirectCallback()
  }

  handleLogoutCallback() {
    return this.userManager.signoutRedirectCallback()
  }

  getUser() {
    return this.userManager.getUser()
  }
}

export const authService = new AuthService()
