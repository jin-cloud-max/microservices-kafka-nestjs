import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type GetByCourseAndStudentIdParams = {
  courseId: string;
  studentId: string;
};

type CreateEnrollmentParams = {
  courseId: string;
  studentId: string;
};

@Injectable()
class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  async listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}

export { EnrollmentsService };
