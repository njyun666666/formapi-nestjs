import { ApiConfigService } from './../../config/api-config.service';
import { JwtPayload, LoginDto } from './dto/login.dto';
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enums';
import { sha256 } from 'src/common/utils/encoding';
import { uuid } from 'src/common/utils/uuid';
import { TbOrgUser } from 'src/entities/TbOrgUser.entity';
import { DataSource } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class LoginService {
  user: JwtPayload;

  constructor(
    private jwtService: JwtService,
    private apiConfigService: ApiConfigService,
    private dataSource: DataSource,
  ) {}

  async login(data: LoginDto) {
    const tbOrgUser = this.dataSource.getRepository(TbOrgUser);
    const user = await tbOrgUser.findOneBy({ Email: data.email });
    const apiKey = this.apiConfigService.app!.key.formApi;
    const password = sha256(data.password, apiKey);

    if (user?.Password !== password) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.Name,
      uid: user.Uid,
      photoUrl: user.PhotoUrl,
      role: [],
    };

    const refresh_token = uuid();

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.apiConfigService.app?.jwt.secret,
        expiresIn: '7d',
      }),
      refresh_token: refresh_token,
    };
  }
}
