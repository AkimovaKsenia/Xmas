import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
    required: true,
    pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Пароль (минимум 6 символов)',
    required: true,
    minLength: 6,
    type: String,
    format: 'password',
  })
  @MinLength(6)
  @IsString()
  password: string;
}
