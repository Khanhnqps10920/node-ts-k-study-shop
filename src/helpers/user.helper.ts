import { User, UserModel } from '../models/User.models';
import { FlexibleObject } from '../utils';

interface IUpdateUserPayload {
  email?: string;
  password?: string;
  refreshToken?: string;
}

export const getOneByCond = async (
  condition: FlexibleObject
): Promise<User | null> => {
  const user = await UserModel.findOne(condition);

  return user;
};

export const updateByCond = async (
  condition: FlexibleObject,
  updateData: IUpdateUserPayload
): Promise<User | null> => {
  const user = await UserModel.findOneAndUpdate(condition, updateData, {
    new: true,
  });

  return user;
};
