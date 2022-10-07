import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreatePurchaseInput {
  @Field()
  productId: string;
}

export { CreatePurchaseInput };
