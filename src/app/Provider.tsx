"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
