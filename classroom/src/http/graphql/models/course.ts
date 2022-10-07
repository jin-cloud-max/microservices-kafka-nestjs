import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;
}

export { Course };
