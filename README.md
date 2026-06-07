# Vuejs OAuth2 Integration with AuthAction

This is a Vue.js application demonstrating how to integrate OAuth2 authentication using [AuthAction](https://app.authaction.com/) with the `@authaction/web-sdk` library.

## Overview

This application showcases how to configure and handle authentication and logout using Authaction's OAuth2 service. The setup includes:

- Redirecting users to the login page.
- Handling successful authentication and displaying user information.
- Logging out users and redirecting them to the specified logout URL.

## Prerequisites

Before using this application, ensure you have:

1. **Node.js and npm installed**: You can download and install them from [nodejs.org](https://nodejs.org/).

2. **Authaction OAuth2 credentials**: You will need to have the `tenantDomain`, `clientId`, and relevant URIs from your Authaction setup.

## Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone git@github.com:authaction/authaction-vuejs-example.git
   cd authaction-vuejs-example
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your Authaction credentials**:

   configure your AuthAction OAuth2 details using environment variables in your `.env` file

   ```bash
   VITE_AUTHACTION_DOMAIN=your-authaction-tenant-domain
   VITE_AUTHACTION_CLIENT_ID=your-authaction-app-clientid
   VITE_AUTHACTION_REDIRECT_URI=http://localhost:5173/callback
   VITE_AUTHACTION_LOGOUT_REDIRECT_URI=http://localhost:5173/logout-callback
   ```

## Usage

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   This will start the Vue application on `http://localhost:5173`.

2. **Testing Authentication**:

   - Open your browser and navigate to `http://localhost:5173`.
   - Click the "Login" button to be redirected to the Authaction login page.
   - After successful login, you will be redirected back to the application with a welcome message showing your name and a "Logout" button.
   - Click the "Logout" button to be logged out and redirected to the specified logout URL.

## Code Explanation

### Configuration (`src/main.ts`)

- **`createAuthAction` Setup**:
  - Registers `@authaction/web-sdk/vue` as a Vue plugin via `app.use(createAuthAction({...}))`.
  - Sets up `domain`, `clientId`, `redirectUri`, and `postLogoutRedirectUri` from Vite environment variables.

### Home View (`src/views/HomeView.vue`)

- **Login and Logout Handling**:
  - `loginWithRedirect()` from `useAuthAction()` redirects the user to the Authaction login page.
  - `logout()` ends the session.
  - The template uses `state.isAuthenticated` and `state.isLoading` to conditionally display a welcome message and logout button or a login button.

### Callback View (`src/views/CallbackView.vue`)

- Calls `handleRedirectCallback()` from `useAuthAction()` on mount to complete the OAuth2 redirect flow, then navigates back to the home page.

## Common Issues

- **Redirects not working**:

  - Ensure that the `redirectUri` and `postLogoutRedirectUri` match the URIs configured in your [AuthAction](https://app.authaction.com/) application settings.
  - Make sure the application is running on the same port as specified in the `redirectUri`.

- **Network Errors**:
  - Verify that your network allows traffic to the Authaction servers and that there are no firewall rules blocking the OAuth2 redirects.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have improvements to suggest.
