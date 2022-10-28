import express from 'express';
import { getProducts } from '../services/products';

export const productsRoute = express.Router();

productsRoute.get('/', getProducts);
