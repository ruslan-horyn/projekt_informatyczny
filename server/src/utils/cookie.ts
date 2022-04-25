import { TokenData } from '../types/jwt.type';

// eslint-disable-next-line max-len
export const createAuthCookie = (tokenData: TokenData) => `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
