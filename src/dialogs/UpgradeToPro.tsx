"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingTier {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    title: "Pro",
    price: "$9.99",
    description: "Perfect for individuals",
    features: [
      "All core features",
      "Up to 10 projects",
      "Priority support",
      "Custom domains",
    ],
    buttonText: "Get Started",
    isPopular: true,
  },
  {
    title: "Team",
    price: "$29.99",
    description: "Great for small teams",
    features: [
      "All Pro features",
      "Unlimited projects",
      "Team collaboration",
      "Advanced analytics",
      "API access",
    ],
    buttonText: "Contact Sales",
  },
];

interface UpgradeToProProps {
  close: () => void;
}

export const DialogUpgradeToPro: React.FC<UpgradeToProProps> = ({ close }) => {
  return (
    <div className="space-y-6 py-4">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <h2 className="text-center text-xl font-semibold">
          Upgrade your experience
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.title}
            className={`relative ${tier.isPopular ? "border-yellow-500 shadow-lg" : ""}`}
          >
            {tier.isPopular && (
              <div className="absolute -top-3 right-4 rounded-full bg-yellow-500 px-2 py-1 text-xs text-white">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {tier.title}
                <span className="text-2xl font-bold">
                  {tier.price}
                  <span className="text-muted-foreground text-sm font-normal">
                    /mo
                  </span>
                </span>
              </CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={
                  tier.isPopular
                    ? "w-full bg-yellow-500 hover:bg-yellow-600"
                    : "w-full"
                }
                onClick={close}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-muted-foreground mt-4 text-center text-sm">
        Need a custom plan?{" "}
        <a href="#" className="text-primary underline">
          Contact us
        </a>
      </div>
    </div>
  );
};
