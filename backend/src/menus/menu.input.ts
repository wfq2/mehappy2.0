import { InputType, Field } from "type-graphql";

@InputType()
export class CreateMenuInput {
  @Field()
  name: string;

  @Field()
  restaurantId: string;
}

@InputType()
export class UpdateMenuInput {
  @Field({ nullable: true })
  name?: string;
}
