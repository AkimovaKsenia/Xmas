import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';
import { ReviewModule } from './review/review.module';
import { path } from 'app-root-path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: `/uploads`,
    }),
    ProductModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
