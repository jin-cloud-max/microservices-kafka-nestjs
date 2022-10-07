import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './student';

@ObjectType()
class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Course)
  course: Course;

  courseId: string;

  @Field(() => Student)
  student: Student;

  studentId: string;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date)
  createdAt: Date;
}

export { Enrollment };
