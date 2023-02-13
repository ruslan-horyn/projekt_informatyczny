import { TokenData } from '../types';

// eslint-disable-next-line max-len
export const createAuthCookie = ({ token, expiresIn }: TokenData) => `Authorization=${token}; HttpOnly; Max-Age=${expiresIn} Path=/`;
