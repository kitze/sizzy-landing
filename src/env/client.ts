// Simple client env for static landing page
export const clientEnv = {
  NEXT_PUBLIC_APP_NAME: import.meta.env.VITE_NEXT_PUBLIC_APP_NAME || "Sizzy",
  NEXT_PUBLIC_APP_DESCRIPTION: import.meta.env.VITE_NEXT_PUBLIC_APP_DESCRIPTION || "The Browser for Web Developers",
  NEXT_PUBLIC_APP_URL: import.meta.env.VITE_NEXT_PUBLIC_APP_URL || "https://sizzy.co",
  NEXT_PUBLIC_AUTH_ENABLE_EMAIL_PASSWORD_AUTHENTICATION: false,
  NEXT_PUBLIC_ENABLE_GITHUB_INTEGRATION: false,
};
