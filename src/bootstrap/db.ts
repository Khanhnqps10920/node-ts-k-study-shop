import mongoose from 'mongoose';
import config from '../config/config';

export const masterDbConn = (): Promise<typeof mongoose> =>
  mongoose.connect(config.DB_URL);
