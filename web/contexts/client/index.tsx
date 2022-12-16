import { ReactNode } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { setContext } from "@apollo/client/link/context";
import { getCookie, TokenNameSpace } from "@/libs/cookies";

const httpLink = createHttpLink({
  uri: process.env.GATEWAY_API_URL,
});

const authLink = setContext((_a, { headers }) => {
  const token = getCookie(TokenNameSpace);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export const clientServerScoped = ({ req, res }: GetServerSidePropsContext) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: setContext((_a, { headers }) => {
      const token = getCookie(TokenNameSpace, { req, res }) as string;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    }).concat(httpLink),
  });
};

type ClientProviderProps = {
  children: ReactNode;
};

const ClientProvider = ({ children }: ClientProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientProvider;
