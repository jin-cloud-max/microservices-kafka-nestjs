import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

type AuthUser = {
  sub: string;
};

const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    return req.auth;
  },
);

export { CurrentUser, AuthUser };
