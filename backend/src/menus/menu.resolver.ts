import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Menu } from "./menu.model";
import { CreateMenuInput } from "./menu.input";
import { Restaurant } from "../restaurants/restaurant.model";
import { Repository } from "typeorm";

@Resolver((of) => Menu)
export class MenuResolver {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}
  @Query(() => [Menu])
  menus(): Promise<Menu[]> {
    return Menu.find();
  }

  @Query(() => Menu)
  async menu(@Arg("id") id: string): Promise<Menu | undefined> {
    return Menu.findOne({ where: { id } });
  }

  @Mutation(() => Menu)
  async createMenu(@Arg("data") data: CreateMenuInput): Promise<Menu> {
    const menu = Menu.create(data);
    await menu.save();
    return menu;
  }
}
