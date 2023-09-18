import { Response } from 'express';
import { UserService } from '../../services/user.service';
import { RequestWithLoginBody } from '../../types';
import { generateToken } from '../../utils/jwt';
import { doPasswordsMatch } from '../../utils/password';
import { AuthController } from '../auth.controller';
import { userMock } from '../__mocks__/user.mock';

jest.mock('../../utils/password', () => ({
  ...jest.requireActual('../../utils/password'),
  doPasswordsMatch: jest.fn(),
}));

jest.mock('../../utils/jwt', () => ({
  ...jest.requireActual('../../utils/jwt'),
  generateToken: jest.fn(),
}));

const DAY_IN_SECONDS = 24 * 60 * 60;
const DEFAULT_REFRESH_EXPIRES_IN = DAY_IN_SECONDS * 2;

describe('AuthController', () => {
  const doPasswordsMatchMock = doPasswordsMatch as jest.MockedFunction<typeof doPasswordsMatch>;
  const generateTokenMock = generateToken as jest.MockedFunction<typeof generateToken>;

  const mockRequest = {
    body: {
      email: 'test.email@example.com',
      password: 'somePassword',
    },
  } as RequestWithLoginBody;

  const mockResponse = {
    cookie: jest.fn(),
    send: jest.fn(),
  } as unknown as Response<Record<string, unknown>>;

  const mockUserService = {
    getUserByEmail: jest.fn(),
  } as unknown as jest.Mocked<UserService>;

  const authController = new AuthController(mockUserService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login correctly', async () => {
      mockUserService.getUserByEmail.mockResolvedValueOnce(userMock);
      doPasswordsMatchMock.mockResolvedValueOnce(true);

      generateTokenMock.mockReturnValueOnce({
        expiresIn: DAY_IN_SECONDS,
        token: 'someToken',
      });
      generateTokenMock.mockReturnValueOnce({
        expiresIn: DEFAULT_REFRESH_EXPIRES_IN,
        token: 'someRefreshToken',
      });

      await authController.login(mockRequest, mockResponse);

      expect(mockUserService.getUserByEmail)
        .toHaveBeenCalledTimes(1);

      expect(doPasswordsMatchMock)
        .toHaveBeenCalledTimes(1);

      expect(generateTokenMock)
        .toHaveBeenCalledTimes(2);

      expect(mockResponse.cookie)
        .toHaveBeenCalledWith('Authorization', 'someRefreshToken', expect.any(Object));

      expect(mockResponse.send)
        .toHaveBeenCalledWith({
          token: 'someToken',
        });
    });
  });
});
