"use client";

import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react"; // Import NextAuth session provider

export function Providers({ children }) {
  return (
    <SessionProvider> {/* Enables authentication state */}
      <Provider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </Provider>
    </SessionProvider>
  );
}