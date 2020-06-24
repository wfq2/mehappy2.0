export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  restaurants: Array<Restaurant>;
  restaurant: Restaurant;
  menus: Array<Menu>;
  menu: Menu;
};


export type QueryRestaurantArgs = {
  id: Scalars['String'];
};


export type QueryMenuArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Scalars['String'];
  isPublished: Scalars['Boolean'];
  menus: Array<Menu>;
};

export type Menu = {
  __typename?: 'Menu';
  id: Scalars['ID'];
  name: Scalars['String'];
  isPublished: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  restaurant: Restaurant;
  items: Array<MenuItem>;
};


export type MenuItem = {
  __typename?: 'MenuItem';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  type: MenuItemType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  menu: Array<Menu>;
};

export enum MenuItemType {
  Appetizer = 'APPETIZER',
  Main = 'MAIN',
  Dessert = 'DESSERT',
  Cocktail = 'COCKTAIL',
  Beer = 'BEER',
  Hardseltzer = 'HARDSELTZER'
}

export type Mutation = {
  __typename?: 'Mutation';
  createRestaurant: Restaurant;
  updateBook: Restaurant;
  deleteRestaurant: Scalars['Boolean'];
  createMenu: Menu;
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


export type MutationCreateMenuArgs = {
  data: CreateMenuInput;
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

export type CreateMenuInput = {
  name: Scalars['String'];
  restaurantId: Scalars['String'];
};

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = (
  { __typename?: 'Query' }
  & { restaurants: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'id' | 'name'>
  )> }
);
