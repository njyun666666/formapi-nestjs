import { LoginService } from './../login/login.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private loginService: LoginService) {}

  login(email: string, password: string) {
    const user = this.loginService.findOne(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    //jwt
    return { access_token: 'test', refresh_token: 'refresh' };
  }
}
