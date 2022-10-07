import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateCustomerParams = {
  authUserId: string;
};

@Injectable()
class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer({ authUserId }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }

  async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }
}

export { CustomersService };
