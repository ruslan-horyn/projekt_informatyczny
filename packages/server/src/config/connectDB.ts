import colors from 'colors';
import mongoose from 'mongoose';
import { config } from './configEnv';

const connectDB = async () => {
  const {
    name, user, pass, url,
  } = config.db;

  const mongoUrl = `${url}/${name}`;

  mongoose.set('strictQuery', false);

  const connect = await mongoose.connect(mongoUrl, { user, pass });
  // eslint-disable-next-line no-console
  console.log(colors.cyan('MongoDB Connected: %s'), connect.connection.host);
};

export default connectDB;
