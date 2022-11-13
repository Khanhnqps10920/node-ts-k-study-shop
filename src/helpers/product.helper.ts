import { Product, ProductModel } from '../models/Product.model';
import { FlexibleObject } from '../utils';

interface ProductQueryCondition {
  cond?: FlexibleObject;
  limit: number;
  skip: number;
}

export const getAll = async (
  condition: ProductQueryCondition
): Promise<Product[]> => {
  const { cond, limit, skip } = condition;

  const products = await ProductModel.find({ ...cond })
    .limit(limit)
    .skip(skip);

  return products;
};

export const getCount = async (cond:FlexibleObject): Promise<number> => {
  const count = await ProductModel.countDocuments({...cond});

  return count;
};

export const getById = async (id: string): Promise<Product | null> => {
  const product = await ProductModel.findById(id);

  return product;
};
