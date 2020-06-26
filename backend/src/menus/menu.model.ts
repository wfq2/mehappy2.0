import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  RelationId,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Restaurant } from "../restaurants/restaurant.model";
import { MenuItem } from "../menuitems/menu-item.model";

@Entity()
@ObjectType()
export class Menu extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isPublished: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  public createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field((type) => Restaurant, { nullable: true })
  @ManyToOne((type) => Restaurant)
  restaurant: Promise<Restaurant>;
  @RelationId((menu: Menu) => menu.restaurant)
  restaurantId: string;

  @Field((type) => [MenuItem])
  @ManyToMany((type) => MenuItem, (item) => item.menus)
  @JoinTable()
  items: Promise<MenuItem[]>;

  @RelationId((menu: Menu) => menu.items)
  itemIds: string[];
}
