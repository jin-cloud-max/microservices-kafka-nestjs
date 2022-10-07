import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

type CreateProductParams = {
  title: string;
};

@Injectable()
class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const producWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (producWithSameSlug) {
      throw new Error('Another product with same slug exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}

export { ProductsService };
