import express from 'express';
import { register, login, refreshToken } from '../services/auth';

export const authRoute = express.Router();

authRoute.post('/login', login);

authRoute.post('/register', register);

authRoute.post('/refreshToken', refreshToken);
