import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserReq = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  console.log(req.user)
  return req.user;
});
