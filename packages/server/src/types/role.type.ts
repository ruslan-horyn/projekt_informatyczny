export type RoleName = 'user' | 'admin' | 'superadmin';
export interface Role {
  id: string;
  name: RoleName;
}
