import { clientEnv } from "@/env/client";

export const APP_NAME = clientEnv.NEXT_PUBLIC_APP_NAME;
export const APP_DESCRIPTION = clientEnv.NEXT_PUBLIC_APP_DESCRIPTION;
export const HEADER_HEIGHT = 60;

export const isEmailPasswordAuthEnabled =
  clientEnv.NEXT_PUBLIC_AUTH_ENABLE_EMAIL_PASSWORD_AUTHENTICATION;

export const hasGithubIntegration =
  clientEnv.NEXT_PUBLIC_ENABLE_GITHUB_INTEGRATION;

export const showEmailPasswordFields = isEmailPasswordAuthEnabled;
