import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true, // если name может быть null, просто оставь true
      },
    });

    return profile;
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    // Если есть пароль, хешируем его
    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    // Обновляем данные пользователя
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    // Возвращаем обновленного пользователя
    return updatedUser;
  }
}
