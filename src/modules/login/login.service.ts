import { ApiConfigService } from './../../config/api-config.service';
import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { uuid } from 'src/common/utils/uuid';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private apiConfigService: ApiConfigService,
  ) {}

  private readonly users: LoginDto[] = [
    {
      email: 'admin@example.com',
      password: 'demo123456',
    },
  ];

  findOne(email: string): LoginDto | undefined {
    return this.users.find((user) => user.email === email);
  }

  async login(data: LoginDto) {
    const user = this.findOne(data.email);
    if (user?.password !== data.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: data.email, username: 'admin' };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.apiConfigService.app?.jwt.secret,
        expiresIn: '7d',
      }),
      refresh_token: uuid(),
    };
  }
}
