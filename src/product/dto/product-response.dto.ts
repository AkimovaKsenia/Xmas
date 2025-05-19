import { ApiProperty } from '@nestjs/swagger';
import { ReviewDto } from '../../review/review.dto';

export class ProductResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Product ID',
  })
  id: number;

  @ApiProperty({
    example: 'Smartphone X',
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: 'High-end smartphone with latest features',
    description: 'Product description',
  })
  description: string;

  @ApiProperty({
    example: 999.99,
    description: 'Product price',
  })
  price: number;

  @ApiProperty({
    example: '2023-05-20T10:00:00.000Z',
    description: 'Creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-05-20T10:00:00.000Z',
    description: 'Last update date',
  })
  updatedAt: Date;

  @ApiProperty({
    type: [ReviewDto],
    description: 'Product reviews',
  })
  reviews: ReviewDto[];
}
