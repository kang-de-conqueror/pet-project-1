import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dto/response.dto';
import { User } from '../user/user.entity';
import { GetUser } from './decorator/get-user.decorator';
import { AuthTokenOutput } from './dto/auth-token-output.dto';
import { GithubOauthGuard } from './guards/github.guard';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('github/callback')
  @UseGuards(GithubOauthGuard)
  @ApiOperation({
    summary: 'User registration API',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AuthTokenOutput),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async githubAuthCallback(@GetUser() user: User) {
    return this.authService.getAuthToken(user);
  }
}
