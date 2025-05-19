import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserDto } from './user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Returns authenticated user profile data',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved user profile',
    schema: {
      example: {
        id: 'cmavdbmvu0007u7lc136yv6ah',
        email: 'user@example.com',
        name: 'John Doe',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing access token',
  })
  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }

  @ApiOperation({
    summary: 'Update user profile',
    description: 'Updates authenticated user profile data',
  })
  @ApiBody({
    type: UserDto,
    description: 'User data to update',
    examples: {
      fullUpdate: {
        summary: 'Full update',
        value: {
          email: 'new@email.com',
          name: 'New Name',
          password: 'newpassword123',
        },
      },
      partialUpdate: {
        summary: 'Partial update',
        value: {
          name: 'Just update name',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Successfully updated user profile',
    schema: {
      example: {
        id: 'cmavdbmvu0007u7lc136yv6ah',
        email: 'new@email.com',
        name: 'New Name',
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
    description: 'Unauthorized - invalid or missing access token',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
