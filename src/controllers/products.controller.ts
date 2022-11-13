import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  generateProduct,
  getProductById,
  getProducts,
} from '../services/products';

export const productsRoute = express.Router();

productsRoute.get('/', authMiddleware, getProducts);

productsRoute.get('/generate', generateProduct);

productsRoute.get('/:id', getProductById);
