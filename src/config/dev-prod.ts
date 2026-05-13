import { clientEnv } from "@/env/client";

export const IS_DEV = clientEnv.NODE_ENV === "development";
export const IS_PROD = clientEnv.NODE_ENV === "production";
