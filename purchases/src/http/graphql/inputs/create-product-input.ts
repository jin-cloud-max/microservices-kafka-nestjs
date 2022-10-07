import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateProductInput {
  @Field()
  title: string;
}

export { CreateProductInput };
