export interface User {
  firstName: string,
  lastName: string
  email: string,
  password?: string,
  confirm: string,
  roles: string[],
  token?: string
}
