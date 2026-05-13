import { clientEnv } from "@/env/client";
import { type PaymentPlan, getPaymentPlans } from "@/config/payment-plans";

/**
 * Helper function to get the active plans based on environment
 */
export const getActivePaymentPlans = (): PaymentPlan[] => {
  const environment =
    clientEnv.NEXT_PUBLIC_POLAR_ENV === "production" ? "production" : "sandbox";
  return getPaymentPlans(environment);
};

/**
 * Type definition for simplified plan format used by Polar plugin
 */
export type PolarProductFormat = {
  productId: string;
  slug: string;
};

export const getPlansForPolarPlugin = (): PolarProductFormat[] => {
  const environment =
    clientEnv.NEXT_PUBLIC_POLAR_ENV === "production" ? "production" : "sandbox";
  const plans = getPaymentPlans(environment);
  return plans.map((plan) => ({
    productId: plan.productId,
    slug: plan.slug,
  }));
};

/**
 * Generate a checkout URL for a specific plan
 * @param planSlug The slug of the plan to checkout
 * @returns The checkout URL for the given plan
 */
export const getCheckoutUrl = (planSlug: string): string => {
  return `/api/auth/checkout/${planSlug}`;
};

/**
 * Generate a sign-in URL with redirect back to pricing
 * @returns URL to sign in page with return to pricing
 */
export const getSignInUrlForPricing = (): string => {
  return `/signup`;
};
