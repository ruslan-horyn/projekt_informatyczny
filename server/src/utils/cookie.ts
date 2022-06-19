import { TokenDataI } from '../types';

// eslint-disable-next-line max-len
export const createAuthCookie = (tokenData: TokenDataI) => `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
