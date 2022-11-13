import mongoose from 'mongoose';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const ProductModel = mongoose.model<Product>('Product', productSchema);
