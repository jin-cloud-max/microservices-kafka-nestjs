import { ForbiddenException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateCourseParams = {
  title: string;
  slug?: string;
};

@Injectable()
class CoursesService {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, {
      lower: true,
    }),
  }: CreateCourseParams) {
    const findCourse = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (findCourse) {
      throw new ForbiddenException();
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}

export { CoursesService };
