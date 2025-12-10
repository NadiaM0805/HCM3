// TypeScript declarations for @phenom/react-ds modules
// These allow TypeScript to recognize the modules even when using fallback stubs

import React from "react";

declare module "@phenom/react-ds/button" {
  export interface ButtonProps {
    buttonType?: "primary" | "secondary" | "neutral";
    label: string;
    onClick?: () => void;
    onFocus?: () => void;
    onMouseEnter?: () => void;
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
  }

  export const Button: React.ComponentType<ButtonProps>;
}

declare module "@phenom/react-ds/badge" {
  export interface BadgeProps {
    value: string;
    type?: "filled" | "success" | "grey" | "warning" | "error";
    size?: "small" | "medium" | "large";
  }

  export const Badge: React.ComponentType<BadgeProps>;
}

declare module "@phenom/react-ds/card" {
  export interface CardProps {
    children: React.ReactNode;
    className?: string;
  }

  export const Card: React.ComponentType<CardProps> & {
    Header: React.ComponentType<{
      title: string;
      description?: string;
    }>;
    Content: React.ComponentType<{
      children: React.ReactNode;
      className?: string;
    }>;
  };
}

declare module "@phenom/react-ds/modal" {
  export interface ModalProps {
    visible: boolean;
    onHide: () => void;
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
  }

  export const Modal: React.ComponentType<ModalProps> & {
    Header: React.ComponentType<{
      children: React.ReactNode;
    }> & {
      Title: React.ComponentType<{
        children: React.ReactNode;
      }>;
      CloseButton: React.ComponentType<{
        onClick?: () => void;
      }>;
    };
    Content: React.ComponentType<{
      children: React.ReactNode;
    }>;
  };
}

declare module "@phenom/react-ds/progressbar" {
  export interface ProgressBarProps {
    value: number;
    max?: number;
    className?: string;
    showLabel?: boolean;
  }

  export const ProgressBar: React.ComponentType<ProgressBarProps>;
}

declare module "@phenom/react-ds/snackbar" {
  export interface ToastOptions {
    duration?: number;
  }

  export const toast: {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
  };

  export const Snackbar: React.ComponentType;
}

declare module "@phenom/react-ds/styles" {
  // Styles module - no exports needed, no longer used
  // This declaration is kept for backwards compatibility but the module is not imported
}

