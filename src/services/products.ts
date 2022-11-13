import { Request, Response } from 'express';
import { getAll, getById, getCount } from '../helpers/product.helper';
import { Product, ProductModel } from '../models/Product.model';
import { formatJSONResponse, errorResponse } from '../utils';
import { faker } from '@faker-js/faker';
import config from '../config/config';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { name, limit, page } = req.query;

    const _limit = Number(limit) || config.DEFAULT_LIMIT;
    const _page = Number(page) || 1;
    const _skip = _limit * (_page - 1);

    const condition = {
      name: {
        $regex: new RegExp(name as string),
        $options: 'i',
      },
    };

    const products = await getAll({
      cond: condition,
      limit: _limit,
      skip: _skip,
    });

    const countProducts = await getCount(condition);

    const returnData = {
      products,
      pagination: {
        _page,
        _limit,
        _total: countProducts,
      },
    };

    const responseData = formatJSONResponse(
      201,
      'Get products success',
      returnData
    );

    return res.json(responseData);
  } catch (e) {
    console.log('getProducts::: ', e);
    return res.json(errorResponse(e));
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getById(id);

    if (!product) {
      throw 'Product is not exist';
    }

    return res.json(formatJSONResponse(201, 'Get product success', product));
  } catch (e) {
    console.log('getProductById::: ', e);
    return res.json(errorResponse(e));
  }
};

export const generateProduct = async (_, response: Response) => {
  console.log('generate products');

  try {
    // remove all product before migrate
    await ProductModel.remove({});
    
    // after remove migrate new data
    // random 100 products
    const products: Product[] = [];
    for (let index = 0; index < 100; index++) {
      const newProduct = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price(100, 500, 0)),
        imageUrl: faker.image.fashion(),
      };

      products.push(newProduct);
    }


    await ProductModel.insertMany(products);

    const responseData = formatJSONResponse(
      201,
      'Generate products success',
      {}
    );

    return response.json(responseData);
  } catch (e) {
    console.log('generateProduct::: ', e);
    return response.json(errorResponse(e));
  }
};
