import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import AppProvider from "@/contexts";
import MasterLayout from "@/layouts/master";

import { Layout } from "@/libs/app/const";

import "@/components/RichText/style.css";

const App = ({ Component, pageProps }: AppProps) => {
  const { isAuth, user, pageLayout } = pageProps;

  return (
    <AppProvider authenticated={isAuth} user={user}>
      <MasterLayout isPrivate={pageLayout === Layout.Private}>
        <Component {...pageProps} />
      </MasterLayout>
    </AppProvider>
  );
};

export default appWithTranslation(App);
