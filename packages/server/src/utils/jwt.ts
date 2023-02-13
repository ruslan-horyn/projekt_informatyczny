import { sign, verify } from 'jsonwebtoken';

import { DataStoredInToken, TokenData } from '../types';

export const generateToken = (idUser: string): TokenData => {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    const expiresIn = 15 * 60 * 1000;

    const token = sign({ id: idUser }, secret, { expiresIn });

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
