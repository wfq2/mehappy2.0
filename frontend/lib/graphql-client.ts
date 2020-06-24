import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const isBrowser: boolean = (process as any).browser;

if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function getToken(): string {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return "";
  }
  return token;
}

const defaultOptions = {
  getToken,
};

function create(initialState: any, { getToken }: Options) {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
    credentials: "same-origin",
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(
  initialState: any,
  options = defaultOptions
): ApolloClient<NormalizedCacheObject> {
  if (!isBrowser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
