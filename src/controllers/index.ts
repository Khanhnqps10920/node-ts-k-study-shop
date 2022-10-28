import { IControllerType } from '../utils';
import { productsRoute } from './products.controller';

export const controllers: IControllerType[] = [
  {
    path: '/products',
    handler: productsRoute,
  },
];
