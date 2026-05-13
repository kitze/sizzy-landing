export enum PlanType {
  Subscription = "subscription",
  OneTime = "one-time",
}

export enum SubscriptionInterval {
  Monthly = "monthly",
  Annual = "annual",
}

export interface BasePlanInfo {
  slug: string;
  name: string;
  description?: string;
  type: PlanType;
  interval?: SubscriptionInterval;
  price: string;
  priceAmount: number;
}

interface BasePlanWithId extends BasePlanInfo {
  productId: string;
}

export interface SubscriptionPlan extends BasePlanWithId {
  type: PlanType.Subscription;
  interval: SubscriptionInterval;
}

export interface OneTimePlan extends BasePlanWithId {
  type: PlanType.OneTime;
}

export type PaymentPlan = SubscriptionPlan | OneTimePlan;

export const basePlans: BasePlanInfo[] = [
  {
    slug: "pro-monthly",
    name: "Pro Monthly",
    description: "Monthly subscription for pro features.",
    type: PlanType.Subscription,
    interval: SubscriptionInterval.Monthly,
    price: "$29",
    priceAmount: 29,
  },
  {
    slug: "pro-annual",
    name: "Pro Annual",
    description: "Annual subscription for pro features",
    type: PlanType.Subscription,
    interval: SubscriptionInterval.Annual,
    price: "$190",
    priceAmount: 190,
  },
  {
    slug: "lifetime",
    name: "Lifetime Access",
    description: "One-time payment for lifetime access.",
    type: PlanType.OneTime,
    price: "$499",
    priceAmount: 499,
  },
];

export const productIdsSandbox: Record<string, string> = {
  "pro-monthly": "3cc391d0-128a-4a9f-bdad-7cfbfe673a91",
  "pro-annual": "02255632-11ec-49cf-8620-790fa6893d00",
  lifetime: "cd58e5e5-e55b-4029-8cbd-ac89e1aab3a3",
};

export const productIdsProduction: Record<string, string> = {
  "pro-monthly": "",
  "pro-annual": "",
  lifetime: "",
};

export const createPlansForEnv = (
  productIds: Record<string, string>,
): PaymentPlan[] => {
  return basePlans
    .map((basePlan: BasePlanInfo) => {
      const productId = productIds[basePlan.slug];
      if (!productId) {
        console.warn(
          `Product ID not found for slug '${basePlan.slug}' in the current environment.`,
        );
        return null;
      }

      if (basePlan.type === PlanType.Subscription) {
        if (!basePlan.interval) {
          console.error(
            `Subscription plan '${basePlan.slug}' is missing an interval.`,
          );
          return null;
        }
        return {
          ...basePlan,
          productId,
          type: PlanType.Subscription,
          interval: basePlan.interval,
        } as SubscriptionPlan;
      } else {
        return {
          ...basePlan,
          productId,
          type: PlanType.OneTime,
        } as OneTimePlan;
      }
    })
    .filter((plan): plan is PaymentPlan => plan !== null);
};

export const getPaymentPlans = (
  environment: "sandbox" | "production",
): PaymentPlan[] => {
  return environment === "production"
    ? createPlansForEnv(productIdsProduction)
    : createPlansForEnv(productIdsSandbox);
};
