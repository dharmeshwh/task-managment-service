import { createParamDecorator } from '@nestjs/common';
import { IVerifyTokenResponse } from '../../middlewares/token-handler';

export const Auth = createParamDecorator(
  (_data, context): IVerifyTokenResponse => {
    const request = context.switchToHttp().getRequest();
    return {
      ...request.user,
    };
  },
);
