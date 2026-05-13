"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
  useState,
} from "react";
import { ConfirmAlert, type ConfirmAlertProps } from "./ConfirmAlert";
import {
  ConfirmAlertDelete,
  type ConfirmAlertDeleteProps,
} from "./ConfirmAlertDelete";

// Alert Types
export type AlertId = string;
export type AlertType = "confirm" | "delete";

// Generic Alert
export interface BaseAlert {
  id: AlertId;
  type: AlertType;
  open: boolean;
}

// Type definitions for specific alerts
export interface ConfirmAlertData extends BaseAlert {
  type: "confirm";
  props: Omit<ConfirmAlertProps, "open" | "onOpenChange">;
}

export interface DeleteAlertData extends BaseAlert {
  type: "delete";
  props: Omit<ConfirmAlertDeleteProps, "open" | "onOpenChange">;
}

// Union type for all alert data
export type AlertData = ConfirmAlertData | DeleteAlertData;

// Alert context state type
interface AlertContextState {
  alerts: AlertData[];
}

// Alert context actions
type AlertAction =
  | { type: "ADD_ALERT"; payload: AlertData }
  | { type: "REMOVE_ALERT"; payload: { id: AlertId } }
  | { type: "SET_ALERT_OPEN"; payload: { id: AlertId; open: boolean } };

// Initial state
const initialState: AlertContextState = {
  alerts: [],
};

// Alert reducer
const alertReducer = (
  state: AlertContextState,
  action: AlertAction,
): AlertContextState => {
  switch (action.type) {
    case "ADD_ALERT":
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case "REMOVE_ALERT":
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload.id),
      };
    case "SET_ALERT_OPEN":
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload.id
            ? { ...alert, open: action.payload.open }
            : alert,
        ),
      };
    default:
      return state;
  }
};

// Generate unique IDs for alerts
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Alert context type
interface AlertContextValue {
  alerts: AlertData[];
  confirmAlert: (
    props: Omit<ConfirmAlertProps, "open" | "onOpenChange">,
  ) => void;
  confirmAlertDelete: (
    props: Omit<ConfirmAlertDeleteProps, "open" | "onOpenChange">,
  ) => void;
  handleOpenChange: (id: AlertId, open: boolean) => void;
}

// Create context
const AlertContext = createContext<AlertContextValue | undefined>(undefined);

// Alert provider props
export interface AlertProviderProps {
  children: ReactNode;
}

// Alert provider component
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Handle open state change
  const handleOpenChange = useCallback((id: AlertId, open: boolean) => {
    if (!open) {
      // When closing, set open to false first (for animation)
      dispatch({ type: "SET_ALERT_OPEN", payload: { id, open } });

      // Then remove after animation finishes
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALERT", payload: { id } });
      }, 300);
    } else {
      dispatch({ type: "SET_ALERT_OPEN", payload: { id, open } });
    }
  }, []);

  // Show confirm alert action
  const confirmAlert = useCallback(
    (props: Omit<ConfirmAlertProps, "open" | "onOpenChange">) => {
      const id = generateId();
      dispatch({
        type: "ADD_ALERT",
        payload: {
          id,
          type: "confirm",
          open: true,
          props,
        },
      });
    },
    [],
  );

  // Show delete confirm alert action
  const confirmAlertDelete = useCallback(
    (props: Omit<ConfirmAlertDeleteProps, "open" | "onOpenChange">) => {
      const id = generateId();
      dispatch({
        type: "ADD_ALERT",
        payload: {
          id,
          type: "delete",
          open: true,
          props,
        },
      });
    },
    [],
  );

  const value = {
    alerts: state.alerts,
    confirmAlert,
    confirmAlertDelete,
    handleOpenChange,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertRenderer />
    </AlertContext.Provider>
  );
};

// Alert renderer component
export const AlertRenderer = React.memo(() => {
  const context = useContext(AlertContext);

  if (!context) {
    return null;
  }

  const { alerts, handleOpenChange } = context;

  if (alerts.length === 0) {
    return null;
  }

  return (
    <>
      {alerts.map((alert) => {
        const onOpenChange = (open: boolean) =>
          handleOpenChange(alert.id, open);

        if (alert.type === "confirm") {
          const { props } = alert;

          return (
            <ConfirmAlert
              key={alert.id}
              open={alert.open}
              onOpenChange={onOpenChange}
              {...props}
            />
          );
        }

        if (alert.type === "delete") {
          const { props } = alert;

          return (
            <ConfirmAlertDelete
              key={alert.id}
              open={alert.open}
              onOpenChange={onOpenChange}
              {...props}
            />
          );
        }

        return null;
      })}
    </>
  );
});

AlertRenderer.displayName = "AlertRenderer";

// Custom hook for using alerts
export const useAlerts = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }

  return context;
};

export const useConfirmAlert = () => {
  const { confirmAlert } = useAlerts();
  return confirmAlert;
};

export const useConfirmAlertDelete = () => {
  const { confirmAlertDelete } = useAlerts();
  return confirmAlertDelete;
};
