import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { Student } from '../models/student';

@Resolver(() => Student)
class StudentsResolver {
  constructor(
    private studentsSertvice: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsSertvice.listAllStudents();
  }

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentsSertvice.getStudentByAuthUserId(user.sub);
  // }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id);
  }
}

export { StudentsResolver };
