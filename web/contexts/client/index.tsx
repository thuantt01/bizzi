import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.GATEWAY_API_URL,
});

type ClientProviderProps = {
  children: ReactNode;
};

const ClientProvider = ({ children }: ClientProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientProvider;
