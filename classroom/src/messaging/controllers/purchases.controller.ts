import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatePayload {
  customer: Customer;
  product: Product;
}

@Controller()
class PurchasesController {
  constructor(
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private studentsSertvice: StudentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatePayload) {
    let student = await this.studentsSertvice.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsSertvice.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}

export { PurchasesController };
