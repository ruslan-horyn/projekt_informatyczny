export type RoleName = 'user' | 'admin' | 'super-admin';
export interface Role {
  id: string;
  name: RoleName;
}
