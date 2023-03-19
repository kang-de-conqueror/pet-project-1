import { IsEnum, IsString } from 'class-validator';

export class SocialAuthInputDto {
  @IsString()
  email: string;

  @IsString()
  avatar: string;

  @IsString()
  name: number;

  @IsString()
  socialId: string;

  @IsEnum(['github', 'google'])
  socialType: 'github' | 'google';
}
