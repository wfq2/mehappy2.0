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

@Resolver((of) => Restaurant)
export class RestaurantResolver implements ResolverInterface<Restaurant> {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>
  ) {}

  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return Restaurant.find();
  }

  @Query((returns) => Restaurant)
  restaurant(
    @Arg("id", { nullable: true }) id?: string,
    @Arg("slug", { nullable: true }) slug?: string
  ): Promise<Restaurant> {
    if (id) {
      return Restaurant.findOneOrFail({ where: { id } });
    } else if (slug) {
      return Restaurant.findOneOrFail({ where: { slug } });
    } else {
      throw Error("must include either id or slug");
    }
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
  async updateRestaurant(
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

  @FieldResolver()
  async menus(@Root() restaurant: Restaurant): Promise<Menu[]> {
    return this.menuRepository.find({ where: { restaurantId: restaurant.id } });
  }
}
