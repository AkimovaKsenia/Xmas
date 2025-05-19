import { ApiProperty } from '@nestjs/swagger';
export class FavoriteDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  productId: number;
}

// product-stats.dto.ts
export class ProductStatsDto {
  @ApiProperty()
  totalProducts: number;

  @ApiProperty()
  totalCategories: number;

  @ApiProperty()
  averagePrice: number;
}
