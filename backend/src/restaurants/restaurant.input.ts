import { InputType, Field } from "type-graphql";

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  owner: string;
}

@InputType()
export class UpdateRestaurantInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  isPublished?: boolean;
}
