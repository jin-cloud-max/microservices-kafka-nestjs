import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateCourseInput {
  @Field()
  title: string;
}

export { CreateCourseInput };
