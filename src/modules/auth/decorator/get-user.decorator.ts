import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInRequest } from 'src/modules/user/dto/user-in-request.dto';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserInRequest => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
