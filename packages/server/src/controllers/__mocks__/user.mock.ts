import { User } from '../../types';

export const userMock = {
  id: 'someId',
  password: 'somePassword',
  email: 'test.email@example.com',
  firstName: 'John',
  lastName: 'Doe',
  roles: [{
    id: 'someRoleId',
    name: 'user',
  }],
} as User;
