import { Role } from 'src/common/enums/role.enums';

export interface LoginDto {
  email: string;
  password: string;
}

export interface JwtPayload {
  uid: string;
  sub: string;
  photoUrl: string | null;
  role: Role[];
}
