import { IControllerType } from '../utils';
import { authRoute } from './auth.controller';
import { helloRoute } from './hello.controller';
import { productsRoute } from './products.controller';
import { userRoute } from './user.controller';

export const controllers: IControllerType[] = [
  {
    path: '/products',
    handler: productsRoute,
  },
  {
    path: '/',
    handler: helloRoute,
  },
  {
    path: '/users',
    handler: userRoute,
  },
  {
    path: '/auth',
    handler: authRoute,
  },
];
