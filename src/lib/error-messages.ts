import { toast } from "sonner";
import { type ErrorContext } from "@better-fetch/fetch";

// Define AUTH_ERROR_CODES locally to avoid client/server boundary issues
export const AUTH_ERROR_CODES = {
  INVALID_EMAIL_OR_PASSWORD: "INVALID_EMAIL_OR_PASSWORD",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_EMAIL: "INVALID_EMAIL",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_LONG: "PASSWORD_TOO_LONG",
  EMAIL_CAN_NOT_BE_UPDATED: "EMAIL_CAN_NOT_BE_UPDATED",
  ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "CREDENTIAL_ACCOUNT_NOT_FOUND",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "SOCIAL_ACCOUNT_ALREADY_LINKED",
  PROVIDER_NOT_FOUND: "PROVIDER_NOT_FOUND",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "FAILED_TO_UNLINK_LAST_ACCOUNT",
  INVALID_TOKEN: "INVALID_TOKEN",
  ID_TOKEN_NOT_SUPPORTED: "ID_TOKEN_NOT_SUPPORTED",
  FAILED_TO_CREATE_USER: "FAILED_TO_CREATE_USER",
  FAILED_TO_CREATE_SESSION: "FAILED_TO_CREATE_SESSION",
  FAILED_TO_UPDATE_USER: "FAILED_TO_UPDATE_USER",
  FAILED_TO_GET_SESSION: "FAILED_TO_GET_SESSION",
  FAILED_TO_GET_USER_INFO: "FAILED_TO_GET_USER_INFO",
  USER_EMAIL_NOT_FOUND: "USER_EMAIL_NOT_FOUND",
  // Add any other relevant codes directly here
} as const;

// Type for the error codes
type AuthErrorCode = keyof typeof AUTH_ERROR_CODES;

// Error message translations
export const errorMessages: Record<AuthErrorCode, string> = {
  // Authentication errors
  [AUTH_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD]: "Invalid email or password",
  [AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED]:
    "Please verify your email before signing in",
  [AUTH_ERROR_CODES.INVALID_PASSWORD]: "Invalid password",
  [AUTH_ERROR_CODES.INVALID_EMAIL]: "Invalid email address",
  [AUTH_ERROR_CODES.USER_NOT_FOUND]: "User not found",
  [AUTH_ERROR_CODES.SESSION_EXPIRED]:
    "Your session has expired, please sign in again",

  // Registration errors
  [AUTH_ERROR_CODES.USER_ALREADY_EXISTS]:
    "A user with this email already exists",
  [AUTH_ERROR_CODES.PASSWORD_TOO_SHORT]: "The password is too short",
  [AUTH_ERROR_CODES.PASSWORD_TOO_LONG]: "The password is too long",

  // Account management errors
  [AUTH_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED]: "This email cannot be updated",
  [AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND]: "Account not found",
  [AUTH_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND]:
    "Credential account not found",

  // Social login errors
  [AUTH_ERROR_CODES.SOCIAL_ACCOUNT_ALREADY_LINKED]:
    "This social account is already linked",
  [AUTH_ERROR_CODES.PROVIDER_NOT_FOUND]: "Authentication provider not found",
  [AUTH_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT]:
    "Cannot unlink your last login method",

  // Token errors
  [AUTH_ERROR_CODES.INVALID_TOKEN]: "Invalid or expired token",
  [AUTH_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED]: "ID token not supported",

  // System errors
  [AUTH_ERROR_CODES.FAILED_TO_CREATE_USER]: "Failed to create user account",
  [AUTH_ERROR_CODES.FAILED_TO_CREATE_SESSION]: "Failed to create login session",
  [AUTH_ERROR_CODES.FAILED_TO_UPDATE_USER]: "Failed to update user information",
  [AUTH_ERROR_CODES.FAILED_TO_GET_SESSION]: "Failed to retrieve session",
  [AUTH_ERROR_CODES.FAILED_TO_GET_USER_INFO]:
    "Failed to retrieve user information",
  [AUTH_ERROR_CODES.USER_EMAIL_NOT_FOUND]: "Email address not found",
};

/**
 * Shows an error toast with translated messages when available
 */
export function showErrorMessage(errorCodeOrContext: string | ErrorContext) {
  let errorCode: string;
  let errorMessage: string | undefined;

  if (typeof errorCodeOrContext === "string") {
    errorCode = errorCodeOrContext;
    errorMessage = undefined;
  } else {
    errorCode = (errorCodeOrContext.error?.code as string) || "Unknown error";
    errorMessage = errorCodeOrContext.error?.message;
  }

  // Get translated message or use default
  const translatedMessage =
    errorCode in AUTH_ERROR_CODES && errorCode in errorMessages
      ? errorMessages[errorCode as AuthErrorCode]
      : errorCode;
  const description = errorMessage || "Something went wrong";

  // Show toast with translated error
  toast.error(translatedMessage, {
    description,
  });
}
