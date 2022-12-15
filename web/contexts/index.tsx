import React, { ReactNode } from "react";

import ThemeProvider from "@/contexts/theme";
import ClientProvider from "@/contexts/client";

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ClientProvider>
  );
};

export default AppProvider;
