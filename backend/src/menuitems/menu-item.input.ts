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

  
}

@InputType()
export class UpdateMenuInput {
  @Field({ nullable: true })
  name?: string;
}