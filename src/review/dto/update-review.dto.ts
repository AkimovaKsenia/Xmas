// update-review.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional({
    example: 'Updated text',
    description: 'Updated text content',
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Updated rating',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ example: 2, description: 'Updated product ID' })
  @IsInt()
  @IsOptional()
  productId?: number;
}
