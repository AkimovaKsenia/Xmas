import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';
import { ReviewModule } from './review/review.module';
import { path } from 'app-root-path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: `/uploads`,
    }),
    ProductModule,
    ReviewModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
