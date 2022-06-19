import { sign, verify } from 'jsonwebtoken';
import { DataStoredInTokenI, TokenDataI } from '../types';

const secret: string = process.env.JWT_SECRET as string;

export const generateToken = (user): TokenDataI => {
  const expiresIn = 60 * 60;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access,no-underscore-dangle
  const token = sign({ id: user._id }, secret, { expiresIn: '1d' });
  
  return { token, expiresIn };
};

// eslint-disable-next-line
export const decode = (token: string): DataStoredInTokenI => verify(token, secret) as DataStoredInTokenI;
