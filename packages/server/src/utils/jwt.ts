import { sign, verify } from 'jsonwebtoken';

import { DataStoredInToken, TokenData } from '../types';

const NoSecretKeyError = new Error('No secret key provided');

const DEFAULT_EXPIRES_IN = 15 * 60 * 1000;
const DEFAULT_REFRESH_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000;

export const generateToken = (idUser: string): TokenData => {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    const expiresIn = DEFAULT_EXPIRES_IN;

    const token = sign({ id: idUser }, secret, { expiresIn });

    return { token, expiresIn };
  }

  throw NoSecretKeyError;
};

export const generateRefreshToken = (idUser: string): TokenData => {
  const secret = process.env.JWT_SECRET_REFRESH;

  if (secret) {
    const expiresIn = DEFAULT_REFRESH_EXPIRES_IN;

    const token = sign({ id: idUser }, secret, { expiresIn });

    return { token, expiresIn };
  }

  throw NoSecretKeyError;
};

export const verifyToken = (token: unknown): DataStoredInToken => {
  const secret = process.env.JWT_SECRET;

  if (secret && typeof token === 'string') {
    return verify(token, secret) as DataStoredInToken;
  }

  throw NoSecretKeyError;
};

export const verifyRefreshToken = (token: unknown): DataStoredInToken => {
  const secret = process.env.JWT_SECRET_REFRESH;

  if (secret && typeof token === 'string') {
    return verify(token, secret) as DataStoredInToken;
  }

  throw NoSecretKeyError;
};
