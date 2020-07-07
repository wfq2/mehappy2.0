import initApollo from "../lib/graphql-client";
import { ApolloProvider } from "@apollo/react-hooks";
import 'antd/dist/antd.css';

export default function App({ Component, pageProps }) {
  const apolloClient = initApollo({});
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
