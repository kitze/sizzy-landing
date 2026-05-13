"use client";

import * as React from "react";
import { CustomSwitch } from "./custom-switch";

export function SwitchExamples() {
  const [states, setStates] = React.useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });

  return (
    <div className="flex flex-col space-y-6 p-4">
      <h2 className="text-2xl font-bold">Custom Switch Sizes</h2>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Extra Small (xs)</span>
          <CustomSwitch
            size="xs"
            checked={states.xs}
            onCheckedChange={(checked) =>
              setStates({ ...states, xs: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Small (sm)</span>
          <CustomSwitch
            size="sm"
            checked={states.sm}
            onCheckedChange={(checked) =>
              setStates({ ...states, sm: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Medium (md) - Default</span>
          <CustomSwitch
            size="md"
            checked={states.md}
            onCheckedChange={(checked) =>
              setStates({ ...states, md: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Large (lg)</span>
          <CustomSwitch
            size="lg"
            checked={states.lg}
            onCheckedChange={(checked) =>
              setStates({ ...states, lg: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Extra Large (xl)</span>
          <CustomSwitch
            size="xl"
            checked={states.xl}
            onCheckedChange={(checked) =>
              setStates({ ...states, xl: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
