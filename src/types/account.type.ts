import { Role } from './enum/role.enum';

export interface AccountProps {
  id?: string ;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: Role[];
}
