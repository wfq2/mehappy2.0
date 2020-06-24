import { useQuery } from "@apollo/react-hooks";
import { FC } from "react";
import {
  GetAllRestaurantsQuery,
  GetAllRestaurantsQueryVariables,
} from "../generated/types";

import gql from "graphql-tag";

// const GET_ALL_RESTAURANTS = loader("./allRestaurants.graphql");
const GET_ALL_RESTAURANTS = gql`
  query getAllRestaurants {
    restaurants {
      id
      name
      owner
    }
  }
`;

const RestaurantList: FC = () => {
  const { loading, error, data } = useQuery<
    GetAllRestaurantsQuery,
    GetAllRestaurantsQueryVariables
  >(GET_ALL_RESTAURANTS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :( {JSON.stringify(error)}</div>;
  return <div>{JSON.stringify(data?.restaurants[0].id)}</div>;
};

export default RestaurantList;
