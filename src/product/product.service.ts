import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { sortType } from './sort.type';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  bySearchTerm(searchTerm?: string) {
    return this.prisma.product.findMany(
      searchTerm
        ? {
            where: {
              OR: [
                {
                  name: {
                    contains: searchTerm,
                  },
                },
                {
                  description: {
                    contains: searchTerm,
                  },
                },
              ],
            },
          }
        : undefined,
    );
  }

  findAll(type?: sortType) {
    let orderBy = {};

    if (type) {
      switch (type) {
        case 'newest':
          orderBy = { createdAt: 'desc' };
          break;
        case 'oldest':
          orderBy = { createdAt: 'asc' };
          break;
        case 'high-to-low':
          orderBy = { price: 'desc' };
          break;
        case 'low-to-high':
          orderBy = { price: 'asc' };
          break;
        default:
          orderBy = { createdAt: 'desc' };
      }
    } else {
      orderBy = { createdAt: 'desc' };
    }

    return this.prisma.product.findMany({
      orderBy,
    });
  }
  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        reviews: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  findRelatives(currentProductId: number) {
    return this.prisma.product.findMany({
      where: {
        id: {
          not: currentProductId,
        },
      },
    });
  }
}
