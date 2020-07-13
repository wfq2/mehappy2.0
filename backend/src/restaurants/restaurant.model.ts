import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Menu } from "../menus/menu.model";

@Entity()
@ObjectType()
export class Restaurant extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  owner: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  zip: string;

  @Field(() => String)
  @Column()
  city: string;

  @Field(() => String)
  @Column()
  state: string;

  @Field(() => String)
  @Column({ unique: true })
  slug: string;

  @Field(() => [String])
  @Column("simple-array")
  tags: string[];

  @Field(() => Boolean)
  @Column({ default: false })
  isPublished: boolean;

  @Field((type) => [Menu])
  @OneToMany((type) => Menu, (menu) => menu.restaurant, { lazy: true })
  menus: Promise<Menu[]>;
}
