"use client";

import React from "react";
import { clientEnv } from "@/env/client";

export default function EnvClientPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-2xl font-bold">Client Environment Variables</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">
          Client Variables (NEXT_PUBLIC_*) from clientEnv
        </h2>
        <div className="rounded-md bg-gray-100 p-4 shadow dark:bg-gray-800">
          <pre className="overflow-x-auto text-sm">
            {Object.entries(clientEnv).length > 0 ? (
              Object.entries(clientEnv).map(([key, value]) => (
                <div key={key}>{`${key}: ${value}`}</div>
              ))
            ) : (
              <div>No NEXT_PUBLIC_ variables found.</div>
            )}
          </pre>
        </div>
      </section>
    </div>
  );
}
