import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsSertvice: StudentsService,
    private coursesSertvice: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsSertvice.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesSertvice.getCourseById(enrollment.courseId);
  }
}

export { EnrollmentsResolver };
