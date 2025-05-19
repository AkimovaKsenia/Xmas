import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the review',
  })
  id: number;

  @ApiProperty({
    example: 'Great product!',
    description: 'Text content of the review',
  })
  text: string;

  @ApiProperty({
    example: 5,
    description: 'Rating from 1 to 5',
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @ApiProperty({
    example: '2023-05-20T10:00:00.000Z',
    description: 'Date when review was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-05-20T10:00:00.000Z',
    description: 'Date when review was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'user123',
    description: 'ID of the user who created the review',
  })
  userId: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the product being reviewed',
  })
  productId: number;
}
