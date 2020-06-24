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

  @Field((type) => Restaurant)
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menus)
  restaurant: Promise<Restaurant>;

  @Field((type) => [MenuItem])
  @ManyToMany((type) => MenuItem)
  @JoinTable()
  items: Promise<MenuItem[]>;
}
