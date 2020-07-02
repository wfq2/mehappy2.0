import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../users/user.model";

@Entity()
@ObjectType()
export class UserSession extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  public createdAt: Date;

  @Field(() => Boolean)
  @Column({ default: false })
  public isRevoked: boolean;

  @Field(() => Date)
  @Column()
  public expiresAt: Date;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User)
  user: Promise<User>;
  @RelationId((userSession: UserSession) => userSession.user)
  userId: string;
}
