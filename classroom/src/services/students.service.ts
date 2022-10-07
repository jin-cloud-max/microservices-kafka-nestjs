import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type StudentParams = {
  authUserId: string;
};

@Injectable()
class StudentsService {
  constructor(private prisma: PrismaService) {}

  async listAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async createStudent(data: StudentParams) {
    return this.prisma.student.create({
      data: {
        authUserId: data.authUserId,
      },
    });
  }
}

export { StudentsService };
