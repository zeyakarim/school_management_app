"use client"; // Required for Client Components

import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import store from "@/redux/store";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </Provider>
  );
}