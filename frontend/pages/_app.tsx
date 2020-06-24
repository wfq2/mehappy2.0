import initApollo from "../lib/graphql-client";
import { ApolloProvider } from "@apollo/react-hooks";

export default function App({ Component, pageProps }) {
  const apolloClient = initApollo({});
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
