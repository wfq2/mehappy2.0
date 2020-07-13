import { InputType, Field } from "type-graphql";

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  owner: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  zip: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  slug: string;

  @Field((of) => [String])
  tags: string[];
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
