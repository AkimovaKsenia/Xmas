import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { ReviewDto } from './review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create a new review' })
  @ApiCreatedResponse({
    description: 'Review created successfully',
    schema: {
      example: {
        id: 1,
        text: 'Great product!',
        rating: 5,
        productId: 1,
        createdAt: '2023-05-20T10:00:00.000Z',
        updatedAt: '2023-05-20T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        statusCode: 400,
        message: ['text should not be empty', 'rating must be between 1 and 5'],
        error: 'Bad Request',
      },
    },
  })
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  // Для update
  @ApiOperation({ summary: 'Update an existing review by ID' })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
    schema: {
      example: {
        id: 1,
        text: 'Updated text',
        rating: 4,
        productId: 1,
        createdAt: '2023-05-20T10:00:00.000Z',
        updatedAt: '2023-05-21T12:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        statusCode: 400,
        message: ['rating must be between 1 and 5'],
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Review not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Review not found',
        error: 'Not Found',
      },
    },
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a review' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.delete(id);
  }
  @ApiOperation({
    summary: 'Get all reviews',
    description: 'Returns all reviews sorted by creation date (newest first)',
  })
  @ApiOkResponse({
    description: 'List of reviews retrieved successfully',
    schema: {
      example: [
        {
          id: 1,
          text: 'Great product!',
          rating: 5,
          createdAt: '2023-05-20T10:00:00.000Z',
          updatedAt: '2023-05-20T10:00:00.000Z',
          userId: 'user123',
          productId: 1,
        },
        {
          id: 2,
          text: 'Could be better',
          rating: 3,
          createdAt: '2023-05-19T09:00:00.000Z',
          updatedAt: '2023-05-19T09:00:00.000Z',
          userId: 'user456',
          productId: 1,
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOperation({
    summary: 'Get latest reviews',
    description: 'Returns the 10 most recent reviews sorted by creation date',
  })
  @ApiOkResponse({
    description: 'List of latest reviews',
    type: [ReviewDto], // Используем DTO вместо типа из Prisma
  })
  @Get('latest')
  getLatest() {
    return this.reviewService.getLatest();
  }
  @ApiOperation({
    summary: 'Get review by ID',
    description: 'Returns a single review by its ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Review ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Review retrieved successfully',
    schema: {
      example: {
        id: 1,
        text: 'Great product!',
        rating: 5,
        createdAt: '2023-05-20T10:00:00.000Z',
        updatedAt: '2023-05-20T10:00:00.000Z',
        userId: 'user123',
        productId: 1,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Review not found',
        error: 'Not Found',
      },
    },
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(+id);
  }
  @ApiOperation({ summary: 'Get average rating for a product' })
  @ApiParam({ name: 'productId', type: Number })
  @ApiOkResponse({ schema: { example: 4.5 } })
  @Get('average-rating/:productId')
  async getAverageRating(@Param('productId', ParseIntPipe) productId: number) {
    const avgRating =
      await this.reviewService.getAverageRatingByProduct(productId);
    if (avgRating === null) throw new NotFoundException('No reviews found');
    return avgRating;
  }
}
