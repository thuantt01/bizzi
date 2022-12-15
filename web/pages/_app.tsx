import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import AppProvider from "@/contexts";
import MasterLayout from "@/layouts/master";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </AppProvider>
  );
};

export default appWithTranslation(App);
