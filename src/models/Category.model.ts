import mongoose from 'mongoose';

export interface Category {
  _id?: string;
  categoryName: string;
}

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
});

export const CategoryModel = mongoose.model<Category>(
  'Category',
  categorySchema
);
