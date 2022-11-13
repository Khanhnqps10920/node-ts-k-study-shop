import { Request, Response } from 'express';
import config from '../config/config';
import registerSchema from '../schema/register.schema';
import { errorResponse, formatJSONResponse } from '../utils';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.models';
import { getOneByCond, updateByCond } from '../helpers/user.helper';
import { decodedToken, generateAccessToken } from '../helpers/auth.helper';
import randToken from 'rand-token';

export const register = async (req: Request, res: Response) => {
  try {
    const validationResult = registerSchema.validate(req.body);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }

    const { email, password } = req.body;

    const user = await getOneByCond({ email });

    if (user) {
      throw new Error('Email already exist!');
    }

    const salt = await bcrypt.genSalt(Number(config.SALT));

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = new UserModel(newUser);

    await result.save();

    const responseData = formatJSONResponse(201, 'Register success', {});

    return res.json(responseData);
  } catch (e) {
    console.log('register::: ', e);
    return res.status(500).json(errorResponse(e));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validationResult = registerSchema.validate(req.body);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }

    const { email, password } = req.body;

    const user = await getOneByCond({ email });

    if (!user) {
      throw new Error('Wrong email or password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Wrong email or password!');
    }

    const accessToken = await generateAccessToken(
      {
        _id: user._id,
        email: user.email,
      },
      config.ACCESS_TOKEN_SECRET,
      config.ACCESS_TOKEN_LIFE
    );

    if (!accessToken) {
      throw new Error('Login not success, please try again!');
    }

    let refreshToken = randToken.generate(config.REFRESH_TOKEN_SIZE);

    if (!user.refreshToken) {
      await updateByCond({ _id: user._id }, { refreshToken });
    }

    if (user.refreshToken) {
      refreshToken = user.refreshToken;
    }

    const userPayload = {
      email: user.email,
      _id: user._id,
    };

    const responseData = formatJSONResponse(201, 'Login success', {
      accessToken,
      refreshToken,
      user: userPayload,
    });

    return res.json(responseData);
  } catch (e) {
    console.log('login::: ', e);
    return res.status(500).json(errorResponse(e));
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res
        .status(401)
        .json(formatJSONResponse(401, 'Cant find access token', {}));
    }

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(401)
        .json(formatJSONResponse(401, 'Cant find refresh token', {}));
    }

    const decoded = await decodedToken(accessToken, config.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res
        .status(400)
        .json(formatJSONResponse(400, 'Refresh token not valid', {}));
    }

    const user = await getOneByCond({ _id: decoded._id });

    if (!user) {
      return res
        .status(401)
        .json(formatJSONResponse(401, 'User not found', {}));
    }

    if (refreshToken !== user.refreshToken) {
      return res
        .status(400)
        .json(formatJSONResponse(400, 'refreshToken not valid', {}));
    }

    const newAccessTokenData = {
      email: user.email,
      _id: user._id,
    };

    const newAccessToken = await generateAccessToken(
      newAccessTokenData,
      config.ACCESS_TOKEN_SECRET,
      config.ACCESS_TOKEN_LIFE
    );

    console.log(newAccessToken);

    if (!newAccessToken) {
      return res
        .status(400)
        .json(
          formatJSONResponse(
            401,
            'Access token cant create, please try again',
            {}
          )
        );
    }

    const responseData = formatJSONResponse(
      201,
      'Refresh token success',
      newAccessToken
    );

    return res.json(responseData);
  } catch (e) {
    console.log('refreshTOken::: ', e);
    return res.json(errorResponse(e));
  }
};
