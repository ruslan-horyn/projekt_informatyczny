import { TokenData } from '../types';

// eslint-disable-next-line max-len
export const createAuthCookie = (tokenData: TokenData) => `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
