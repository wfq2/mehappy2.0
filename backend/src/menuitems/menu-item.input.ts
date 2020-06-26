import { InputType, Field } from "type-graphql";
import { MenuItemType } from "./menu-item.model";

@InputType()
export class CreateMenuItemInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field()
  type: MenuItemType;

  @Field((type) => [String])
  menuIds: string[];
}

@InputType()
export class UpdateMenuInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  type: MenuItemType;

  @Field((type) => [String])
  menuIds: string[];
}
