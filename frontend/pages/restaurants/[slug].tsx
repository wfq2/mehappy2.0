import { GetStaticProps, GetStaticPaths } from "next";

import gql from "graphql-tag";

import { useQuery } from "@apollo/react-hooks";
import {
  GetAllSlugsQuery,
  GetAllSlugsQueryVariables,
  GetRestaurantBySlugQuery,
  GetRestaurantBySlugQueryVariables,
  Restaurant,
} from "../../generated/types";
import LayoutStyle from "../../components/LayoutStyle";
import initApollo from "../../lib/graphql-client";

const apolloClient = initApollo({});

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

type Props = {
  data?: GetRestaurantBySlugQuery;
  errors?: string;
};

const GET_ALL_SLUGS = gql`
  query getAllSlugs {
    restaurants {
      slug
    }
  }
`;

const GET_RESTAURANT_BY_SLUG = gql`
  query getRestaurantBySlug($slug: String!) {
    restaurant(slug: $slug) {
      name
      description
    }
  }
`;

const StaticPropsDetail = ({ data, errors }: Props) => {
  if (errors) {
    return (
      <LayoutStyle title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </LayoutStyle>
    );
  }

  return (
    <LayoutStyle
      title={`${
        data?.restaurant?.name ? data?.restaurant?.name : "Restaurant"
      } | Next.js + TypeScript Example`}
    >
      <Content>
        <h1>{data?.restaurant?.name}</h1>
      </Content>
    </LayoutStyle>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const { data } = await apolloClient.query<
    GetAllSlugsQuery,
    GetAllSlugsQueryVariables
  >({ query: GET_ALL_SLUGS });

  const paths = data!.restaurants.map((a) => {
    return {
      params: {
        slug: a.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  try {
    const { data } = await apolloClient.query<
      GetRestaurantBySlugQuery,
      GetRestaurantBySlugQueryVariables
    >({ query: GET_RESTAURANT_BY_SLUG, variables: { slug: slug } });
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { data } };
  } catch (error) {
    return { props: { errors: error?.message } };
  }
};
