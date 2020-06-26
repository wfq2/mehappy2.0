import { Menu } from "../menus/menu.model";
import {
  ResolverInterface,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  Resolver,
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository, getConnection } from "typeorm";
import { MenuItem } from "./menu-item.model";
import { CreateMenuItemInput } from "./menu-item.input";

@Resolver((of) => MenuItem)
export class MenuItemResolver implements ResolverInterface<MenuItem> {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>
  ) {}

  @Query(() => [MenuItem])
  items(): Promise<MenuItem[]> {
    return this.menuItemRepository.find();
  }

  @Query(() => MenuItem)
  async item(@Arg("id") id: string): Promise<MenuItem> {
    return this.menuItemRepository.findOneOrFail({ where: { id } });
  }

  @Mutation(() => MenuItem)
  async createMenuItem(
    @Arg("data") data: CreateMenuItemInput
  ): Promise<MenuItem> {
    const menuItem = this.menuItemRepository.create(data);
    await menuItem.save();
    await getConnection()
      .createQueryBuilder()
      .relation(MenuItem, "menus")
      .of(menuItem)
      .add(data.menuIds);
    return menuItem;
  }

  @FieldResolver()
  async menus(@Root() menuItem: MenuItem): Promise<Menu[]> {
    return this.menuRepository.findByIds(menuItem.menuIds);
  }

}
