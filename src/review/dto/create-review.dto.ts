// create-review.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Great product!',
    description: 'Text content of the review',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    example: 5,
    description: 'Rating from 1 to 5',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 1, description: 'ID of the product being reviewed' })
  @IsInt()
  productId: number;
}
