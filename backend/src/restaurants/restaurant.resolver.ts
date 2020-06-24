import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Root,
  FieldResolver,
  ResolverInterface,
} from "type-graphql";
import { Restaurant } from "./restaurant.model";
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from "./restaurant.input";
import { Menu } from "../menus/menu.model";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

@Resolver((type) => Restaurant)
export class RestaurantResolver {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>
  ) {}

  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return Restaurant.find();
  }

  @Query((returns) => Restaurant)
  restaurant(@Arg("id") id: string): Promise<Restaurant | undefined> {
    return Restaurant.findOne({ where: { id } });
  }

  @Mutation((returns) => Restaurant)
  async createRestaurant(
    @Arg("data") data: CreateRestaurantInput
  ): Promise<Restaurant> {
    const restaurant = Restaurant.create(data);
    await restaurant.save();
    return restaurant;
  }

  @Mutation((returns) => Restaurant)
  async updateBook(
    @Arg("id") id: string,
    @Arg("data") data: UpdateRestaurantInput
  ): Promise<Restaurant> {
    const restaurant = await Restaurant.findOne({ where: { id } });
    if (!restaurant) throw new Error("Restaurant not found!");
    Object.assign(restaurant, data);
    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Boolean)
  async deleteRestaurant(@Arg("id") id: string): Promise<boolean> {
    const book = await Restaurant.findOne({ where: { id } });
    if (!book) throw new Error("Restaurant not found!");
    await book.remove();
    return true;
  }
}
