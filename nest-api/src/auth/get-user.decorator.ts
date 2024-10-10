import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../user/user.interface';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): IUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
