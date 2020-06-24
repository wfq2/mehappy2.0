import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { registerEnumType } from "type-graphql";
import { ObjectType, Field, ID } from "type-graphql";
import { Menu } from "../menus/menu.model";

@Entity()
@ObjectType()
export class MenuItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => MenuItemType)
  @Column()
  type: MenuItemType;

  @Field(() => Date)
  @CreateDateColumn()
  public createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field((type) => [Menu])
  @ManyToMany((type) => Menu)
  menu: Promise<Menu[]>;
}

enum MenuItemType {
  APPETIZER = "APPETIZER",
  MAIN = "MAIN",
  DESSERT = "DESSERT",
  COCKTAIL = "COCKTAIL",
  BEER = "BEER",
  HARDSELTZER = "HARDSELTZER",
}

registerEnumType(MenuItemType, {
  name: "MenuItemType",
});
