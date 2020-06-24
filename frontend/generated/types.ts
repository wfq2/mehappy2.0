export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  restaurants: Array<Restaurant>;
  restaurant: Restaurant;
};


export type QueryRestaurantArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Scalars['String'];
  isPublished: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRestaurant: Restaurant;
  updateBook: Restaurant;
  deleteRestaurant: Scalars['Boolean'];
};


export type MutationCreateRestaurantArgs = {
  data: CreateRestaurantInput;
};


export type MutationUpdateBookArgs = {
  data: UpdateRestaurantInput;
  id: Scalars['String'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['String'];
};

export type CreateRestaurantInput = {
  name: Scalars['String'];
  owner: Scalars['String'];
};

export type UpdateRestaurantInput = {
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
};

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = (
  { __typename?: 'Query' }
  & { restaurants: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'id' | 'name' | 'owner'>
  )> }
);
