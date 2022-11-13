import { FlexibleObject } from '../utils';
import jwt from 'jsonwebtoken';

interface VerifyTokenPayload {
  email: string;
  _id: string;
}

export const generateAccessToken = async (
  payload: FlexibleObject,
  secretKey: string,
  tokenLife: string
): Promise<string | null> => {
  try {
    return await jwt.sign(payload, secretKey, {
      expiresIn: tokenLife,
      algorithm: 'HS256',
    });
  } catch (e) {
    console.log('generateAccessToken::: ', e);
    return null;
  }
};

export const verifyToken = async (
  token: string,
  secret: string
): Promise<VerifyTokenPayload | undefined> => {
  try {
    return (await jwt.verify(token, secret)) as VerifyTokenPayload;
  } catch (e) {
    console.log('verifyToken::: ', e);
  }
};

export const decodedToken = async (
  token: string,
  secretKey: string
): Promise<VerifyTokenPayload | undefined> => {
  try {
    return (await jwt.verify(token, secretKey, {
      ignoreExpiration: true,
    })) as VerifyTokenPayload;
  } catch (e) {
    console.log('decodedToken::: ', e);
    return undefined;
  }
};
