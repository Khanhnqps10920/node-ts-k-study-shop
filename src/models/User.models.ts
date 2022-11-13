import mongoose from 'mongoose';

export interface User {
  _id?: string;
  email: string;
  password: string;
  refreshToken?: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
