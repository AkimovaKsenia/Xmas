import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    const existing = await this.prisma.review.findFirst({
      where: {
        productId: dto.productId,
        text: dto.text,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Review already exists for this product with the same text',
      );
    }

    return this.prisma.review.create({
      data: {
        text: dto.text,
        rating: dto.rating,
        productId: dto.productId,
      },
    });
  }

  async update(id: number, dto: UpdateReviewDto) {
    await this.findById(id); // Проверяем, что отзыв существует
    try {
      return await this.prisma.review.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.error('Update review error:', error);
      throw error;
    }
  }

  async delete(id: number) {
    await this.findById(id); // проверить, что есть
    return this.prisma.review.delete({ where: { id } });
  }
  findAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
  getLatest() {
    return this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
  async getAverageRatingByProduct(productId: number) {
    const result = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    return result._avg.rating ?? null;
  }
}
