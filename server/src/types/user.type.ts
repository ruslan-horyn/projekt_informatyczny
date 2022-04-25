export interface UserI {
  firstName: string,
  lastName: string
  email: string,
  password?: string,
  confirm: string,
  roles: string[],
  token?: string
}
