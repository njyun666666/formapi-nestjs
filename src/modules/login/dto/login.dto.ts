import { IsEmail, IsNotEmpty } from 'class-validator';
import { Menu } from 'src/common/enums/meun.enum';
import { Role } from 'src/common/enums/role.enums';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface JwtPayload {
  uid: string;
  sub: string;
  photoUrl: string | null;
  role: Role[];
  menu: Menu[];
}
