import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { sortType } from './sort.type';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get all products',
    description: 'Get all products with optional sorting',
  })
  @ApiQuery({
    name: 'sortType',
    enum: ['newest', 'oldest', 'low-to-high', 'high-to-low'],
    required: false,
    description: 'Sorting type',
  })
  @ApiOkResponse({
    type: [ProductResponseDto],
    description: 'List of products retrieved successfully',
  })
  @Get()
  findAllWithSort(@Query('sortType') type?: sortType) {
    return this.productService.findAll(type);
  }

  @ApiOperation({
    summary: 'Search products',
    description: 'Search products by name or description',
  })
  @ApiQuery({
    name: 'searchTerm',
    type: String,
    required: false,
    description: 'Search term',
  })
  @ApiOkResponse({
    type: [ProductResponseDto],
    description: 'List of matching products',
  })
  @Get('search')
  findAllBySearchTerm(@Query('searchTerm') searchTerm?: string) {
    return this.productService.bySearchTerm(searchTerm);
  }

  @ApiOperation({
    summary: 'Get related products',
    description: 'Get products related to current product (excluding current)',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Product ID',
  })
  @ApiOkResponse({
    type: [ProductResponseDto],
    description: 'List of related products',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.productService.findRelatives(+id);
  }
  @Get('newest')
  @ApiOperation({ summary: 'Get newest products' })
  @ApiOkResponse({
    type: [ProductResponseDto],
    description: 'List of newest products',
  })
  async getNewest() {
    return this.productService.getNewest();
  }
  @Get('popular')
  @ApiOperation({ summary: 'Get popular products' })
  @ApiOkResponse({
    type: [ProductResponseDto],
    description: 'Top 10 popular products based on review count',
  })
  getPopular() {
    return this.productService.getPopular();
  }

  @Get('price-range')
  @ApiOperation({ summary: 'Get price range' })
  @ApiOkResponse({
    description: 'Min and max price range',
    schema: {
      example: {
        min: 1990,
        max: 49990,
      },
    },
  })
  async getPriceRange() {
    return this.productService.getPriceRange();
  }

  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Get product details including reviews',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Product ID',
  })
  @ApiOkResponse({
    type: ProductResponseDto,
    description: 'Product details',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({
    description: 'Product updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiOkResponse({
    description: 'Product deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
