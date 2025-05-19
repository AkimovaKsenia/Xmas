import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication') // Более понятное название группы
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  }
  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates new user account and returns auth tokens',
  })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    schema: {
      example: {
        user: {
          id: '1',
          email: 'user@example.com',
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 6 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'User already exists',
        error: 'Conflict',
      },
    },
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Received data:', dto);
    const { refreshToken, ...response } = await this.authService.register(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  }

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates user and returns access/refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful authentication',
    schema: {
      example: {
        user: {
          id: 'cmavdbmvu0007u7lc136yv6ah',
          email: 'user@example.com',
          name: '',
          createdAt: '2025-05-19T17:37:42.810Z',
          updatedAt: '2025-05-19T17:37:42.810Z',
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 6 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiBody({
    type: AuthDto,
    description: 'Данные для входа',
    examples: {
      example1: {
        summary: 'Пример запроса',
        value: {
          email: 'user@example.com',
          password: 'Password123!',
        },
      },
    },
  })
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];
    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  }
  @ApiOperation({
    summary: 'Logout user',
    description: 'Invalidates refresh token and clears authentication cookies',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
    schema: {
      example: {
        success: true,
        message: 'Logged out successfully',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - missing or invalid refresh token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Invalid or missing refresh token',
      },
    },
  })
  @ApiCookieAuth('refreshToken') // Указываем, что требуется cookie аутентификация
  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return true;
  }
}
