import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  ResolverInterface,
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Menu } from "./menu.model";
import { CreateMenuInput } from "./menu.input";
import { Restaurant } from "../restaurants/restaurant.model";
import { Repository } from "typeorm";
import { MenuItem } from "../menuitems/menu-item.model";

@Resolver((of) => Menu)
export class MenuResolver implements ResolverInterface<Menu> {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>
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

  @FieldResolver()
  async restaurant(@Root() menu: Menu): Promise<Restaurant> {
    return this.restaurantRepository.findOneOrFail(menu.restaurantId, {
      cache: 1000,
    });
  }

  @FieldResolver()
  async items(@Root() menu: Menu): Promise<MenuItem[]> {
    return this.menuItemRepository.findByIds(menu.itemIds);
  }
}
