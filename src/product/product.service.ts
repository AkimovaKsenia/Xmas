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
  getNewest() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
  async getPopular() {
    return this.prisma.product.findMany({
      orderBy: {
        reviews: {
          _count: 'desc',
        },
      },
      take: 10,
    });
  }

  async getPriceRange() {
    try {
      const result = await this.prisma.$queryRawUnsafe<
        { min: number; max: number }[]
      >(`SELECT MIN(price) as min, MAX(price) as max FROM "Product"`); // или "products", если у тебя переименовано

      if (!result || result.length === 0) {
        return { min: 0, max: 0 };
      }

      return result[0];
    } catch (error) {
      console.error('Error in getPriceRange:', error);
      throw new Error('Failed to get price range');
    }
  }
  async update(id: number, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }
  async remove(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({ where: { id } });
  }
}
