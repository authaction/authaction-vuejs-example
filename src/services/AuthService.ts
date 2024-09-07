import { UserManager, WebStorageStateStore } from 'oidc-client-ts'
import AuthConfig from '../config.json'

const oidcConfig = {
  authority: `https://${AuthConfig.tenantDomain}`,
  client_id: AuthConfig.clientId,
  redirect_uri: AuthConfig.redirectUri,
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: AuthConfig.logoutRedirectUri,
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
