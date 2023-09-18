import { Algorithm, sign, verify } from 'jsonwebtoken';
import { config } from '../config/configEnv';
import { DEFAULT_EXPIRES_IN } from '../config/const';
import { DataStoredInToken, TokenData } from '../types';

const { secret, algorithm } = config.jwt;
const NoValidToken = new Error('Token is not valid');

export const generateToken = (idUser: string, expiresIn = DEFAULT_EXPIRES_IN): TokenData => {
  const token = sign({ id: idUser }, secret, { expiresIn, algorithm: algorithm as Algorithm });

  return { token, expiresIn };
};

export const verifyToken = (token: unknown): DataStoredInToken => {
  if (secret && typeof token === 'string') {
    return verify(token, secret) as DataStoredInToken;
  }

  throw NoValidToken;
};
