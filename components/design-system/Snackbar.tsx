"use client";

import { toast as sonnerToast } from "sonner";
import { Toaster } from "sonner";

// Use sonner for actual toast notifications
export const toast = {
  success: (message: string, options?: { duration?: number }) => {
    sonnerToast.success(message, { duration: options?.duration });
  },
  error: (message: string, options?: { duration?: number }) => {
    sonnerToast.error(message, { duration: options?.duration });
  },
  info: (message: string, options?: { duration?: number }) => {
    sonnerToast.info(message, { duration: options?.duration });
  },
  warning: (message: string, options?: { duration?: number }) => {
    sonnerToast.warning(message, { duration: options?.duration });
  },
};

// Snackbar component - renders the Toaster
export function Snackbar() {
  return <Toaster position="bottom-right" />;
}

