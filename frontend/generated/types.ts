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
  items: Array<MenuItem>;
  item: MenuItem;
  users: Array<User>;
  user: User;
};


export type QueryRestaurantArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};


export type QueryMenuArgs = {
  id: Scalars['String'];
};


export type QueryItemArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  address: Scalars['String'];
  zip: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  slug: Scalars['String'];
  tags: Array<Scalars['String']>;
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
  restaurant?: Maybe<Restaurant>;
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
  menus: Array<Menu>;
};

export enum MenuItemType {
  Appetizer = 'APPETIZER',
  Main = 'MAIN',
  Dessert = 'DESSERT',
  Cocktail = 'COCKTAIL',
  Beer = 'BEER',
  Hardseltzer = 'HARDSELTZER'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRestaurant: Restaurant;
  updateRestaurant: Restaurant;
  deleteRestaurant: Scalars['Boolean'];
  createMenu: Menu;
  createMenuItem: MenuItem;
  createUser: User;
  login: Scalars['String'];
};


export type MutationCreateRestaurantArgs = {
  data: CreateRestaurantInput;
};


export type MutationUpdateRestaurantArgs = {
  data: UpdateRestaurantInput;
  id: Scalars['String'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['String'];
};


export type MutationCreateMenuArgs = {
  data: CreateMenuInput;
};


export type MutationCreateMenuItemArgs = {
  data: CreateMenuItemInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type CreateRestaurantInput = {
  name: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  address: Scalars['String'];
  zip: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  slug: Scalars['String'];
  tags: Array<Scalars['String']>;
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

export type CreateMenuItemInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  type: Scalars['String'];
  menuIds: Array<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = (
  { __typename?: 'Query' }
  & { restaurants: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'id' | 'name' | 'owner'>
  )> }
);

export type GetAllSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSlugsQuery = (
  { __typename?: 'Query' }
  & { restaurants: Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'slug'>
  )> }
);

export type GetRestaurantBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetRestaurantBySlugQuery = (
  { __typename?: 'Query' }
  & { restaurant: (
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'name' | 'description'>
  ) }
);
