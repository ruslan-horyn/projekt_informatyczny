import colors from 'colors';
import mongoose from 'mongoose';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI || '');
  // eslint-disable-next-line no-console
  console.log(colors.cyan('MongoDB Connected: %s'), conn.connection.host);
};

export default connectDB;
