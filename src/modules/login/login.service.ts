import { ApiConfigService } from './../../config/api-config.service';
import { JwtPayload, LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Menu } from 'src/common/enums/meun.enum';
import { Role } from 'src/common/enums/role.enums';
import { sha256 } from 'src/common/utils/encoding';
import { uuid } from 'src/common/utils/uuid';
import { TbAuth } from 'src/entities/TbAuth';
import { TbMenu } from 'src/entities/TbMenu';
import { TbOrgUser } from 'src/entities/TbOrgUser';
import { DataSource } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private apiConfigService: ApiConfigService,
    private dataSource: DataSource,
  ) {}

  async login(data: LoginDto) {
    const tbOrgUser = this.dataSource.getRepository(TbOrgUser);
    const user = await tbOrgUser.findOne({
      where: { email: data.email },
      relations: { tbOrgRoles: true },
    });
    const apiKey = this.apiConfigService.app!.key.formApi;
    const password = sha256(data.password, apiKey);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const roles = user.tbOrgRoles.map((role) => role.rid);

    const menus = await this.dataSource
      .getRepository(TbMenu)
      .createQueryBuilder()
      .select(['menuId'])
      .where('FnAuth(:uid,menuId)>0', { uid: user.uid })
      .getRawMany<TbMenu>();

    const payload: JwtPayload = {
      sub: user.name,
      uid: user.uid,
      photoUrl: user.photoUrl,
      role: roles as Role[],
      menu: menus.map((auth) => auth.menuId as Menu),
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
