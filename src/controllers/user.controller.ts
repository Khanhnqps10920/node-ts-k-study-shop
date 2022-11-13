import express from 'express';
import { generateUser } from '../services/user';

export const userRoute = express.Router();

userRoute.get('/generate', generateUser);

userRoute.post('/register');

