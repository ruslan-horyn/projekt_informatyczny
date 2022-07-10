import { sign, verify } from 'jsonwebtoken';

import { DataStoredInToken, TokenData } from '../types';

export const generateToken = (user): TokenData => {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    const expiresIn = 60 * 60;

    const token = sign({ id: user._id }, secret, { expiresIn: '365d' });

    return { token, expiresIn };
  }

  throw new Error('No secret key provided');
};

export const decode = (token: string): DataStoredInToken => {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    return verify(token, secret) as DataStoredInToken;
  }

  throw new Error('No secret key provided');
};
