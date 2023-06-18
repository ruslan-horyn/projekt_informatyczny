import colors from 'colors';
import mongoose from 'mongoose';

const connectDB = async () => {
  const host = process.env.MONGO_HOST || 'localhost';
  const port = process.env.MONGO_PORT || '27017';
  const dbName = process.env.MONGO_DB || 'app';
  const url = `mongodb://${host}:${port}/${dbName}`;
  // connect to mongoDB database with options

  const connect = await mongoose.connect(url);
  // eslint-disable-next-line no-console
  console.log(colors.cyan('MongoDB Connected: %s'), connect.connection.host);
};

export default connectDB;
