import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { User, UserModel } from '../models/User.models';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { formatJSONResponse } from '../utils';

export const generateUser = async (_: Request, res: Response) => {
  try {
    await UserModel.remove({});

    const users: User[] = [];

    const salt = await bcrypt.genSalt(Number(config.SALT));

    // generate 10 new user
    for (let index = 0; index < 10; index++) {
      const newUser: User = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      }
      
      newUser.password = await bcrypt.hash(newUser.password, salt);

      users.push(newUser);
    }

    UserModel.insertMany(users);

    const responseData = formatJSONResponse(
      201,
      'Generate users success',
      {}
    );

    res.send(responseData);
  } catch (e) {
    console.log('generateUser::: ', e);
  } 
  
}