import { IsEmail, IsNotEmpty } from 'class-validator';
import { MenuEnum } from 'src/common/enums/meun.enum';
import { RoleEnum } from 'src/common/enums/role.enums';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface TokenResponseDto {
  access_token: string;
  refresh_token: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}

export interface JwtPayload {
  uid: string;
  sub: string;
  photoUrl: string | null;
  role: RoleEnum[];
  menu: MenuEnum[];
}
