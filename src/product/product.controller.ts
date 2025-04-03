import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { sortType } from './sort.type';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllWithSort(@Query('sortType') type?: sortType) {
    return this.productService.findAll(type);
  }

  @Get('search')
  findAllBySearchTerm(@Query('searchTerm') searchTerm?: string) {
    return this.productService.bySearchTerm(searchTerm);
  }

  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.productService.findRelatives(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }
}
