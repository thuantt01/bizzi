import React, { ReactNode } from "react";

import AuthProvider from "@/contexts/auth";
import ThemeProvider from "@/contexts/theme";
import ClientProvider from "@/contexts/client";

type AppProviderProps = {
  children: ReactNode;
  authenticated: boolean;
  user: { name: string; email: string };
};

const AppProvider = ({ children, authenticated, user }: AppProviderProps) => {
  return (
    <AuthProvider authenticated={authenticated} user={user}>
      <ClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ClientProvider>
    </AuthProvider>
  );
};

export default AppProvider;
