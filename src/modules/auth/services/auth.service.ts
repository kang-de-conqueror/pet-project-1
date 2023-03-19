import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { Profile } from 'passport-github';
import { randomToken } from 'src/shared/utils/util.helper';
import { User } from '../../user/user.entity';
import { UserRepository } from '../../user/user.repository';
import { AuthOutput } from '../dto/auth-output.dto';
import { AuthTokenOutput } from '../dto/auth-token-output.dto';
import { RegisterInput } from '../dto/register-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async getAuthToken(user: Partial<User>): Promise<AuthTokenOutput> {
    const subject = { sub: user.id };
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: this.configService.get('jwt.refreshTokenExpiresInSec'),
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: this.configService.get('jwt.accessTokenExpiresInSec') },
      ),
    };
    return plainToInstance(AuthTokenOutput, authToken, {
      excludeExtraneousValues: true,
    });
  }

  async githubLogin(profile: Profile): Promise<Partial<User>> {
    const { _json } = profile;
    const { email, avatar_url, name } = _json as any;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return existingUser;
    }

    try {
      /**
       *  If not, create a new user based on with github account information
       *  Note that we will generate a mock username and password
       *  so after logging in using github, if use want to switch to username/password auth,
       *  user must update username and password first!
       *  */
      const initialPassword = await bcrypt.hash(randomToken(), 10);
      const newUser = await this.userRepository.save({
        username: `${email}-${new Date().getTime()}`,
        password: initialPassword,
        avatar: avatar_url,
        email,
        name: name || '',
      });

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while creating new user',
      );
    }
  }
}
