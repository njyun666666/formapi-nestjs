import { ApiConfigService } from './../../config/api-config.service';
import {
  JwtPayload,
  LoginDto,
  RefreshTokenDto,
  TokenResponseDto,
} from './dto/login.dto';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { MenuEnum } from 'src/common/enums/meun.enum';
import { RoleEnum } from 'src/common/enums/role.enums';
import { sha256 } from 'src/common/utils/encoding';
import { uuid } from 'src/common/utils/uuid';
import { TbMenu } from 'src/entities/TbMenu';
import { TbOrgUser } from 'src/entities/TbOrgUser';
import { TbRefreshToken } from 'src/entities/TbRefreshToken';
import { DataSource, LessThan, MoreThanOrEqual } from 'typeorm';

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
      throw new UnauthorizedException('Login_Failed');
    }

    if (!user.enable) {
      throw new UnauthorizedException('Disabled');
    }

    return this.jwt(user);
  }

  async refreshToken(data: RefreshTokenDto) {
    const tbRefreshToken = this.dataSource.getRepository(TbRefreshToken);
    const tbOrgUser = this.dataSource.getRepository(TbOrgUser);
    await tbRefreshToken.delete({ expireTime: LessThan(new Date()) });

    const refreshData = await tbRefreshToken.findOneBy({
      refreshToken: data.refresh_token,
      expireTime: MoreThanOrEqual(new Date()),
    });

    if (!refreshData) {
      throw new UnauthorizedException();
    }

    await tbRefreshToken.delete(refreshData);

    const user = await tbOrgUser.findOne({
      where: { uid: refreshData.uid },
      relations: { tbOrgRoles: true },
    });

    if (!user || !user.enable) {
      throw new UnauthorizedException();
    }

    return this.jwt(user);
  }

  async jwt(user: TbOrgUser) {
    const menus = await this.dataSource
      .getRepository(TbMenu)
      .createQueryBuilder()
      .select(['MenuId as menuId'])
      .where('FnAuth(:uid,menuId)>0', { uid: user.uid })
      .getRawMany<TbMenu>();

    const payload: JwtPayload = {
      sub: user.name,
      uid: user.uid,
      photoUrl: user.photoUrl,
      role: user.tbOrgRoles.map((item) => item.rid as RoleEnum),
      menu: menus.map((item) => item.menuId as MenuEnum),
    };

    const refresh = new TbRefreshToken();
    refresh.refreshToken = uuid();
    refresh.uid = user.uid;
    refresh.expireTime = dayjs().add(1, 'month').toDate();

    await this.dataSource
      .getRepository(TbRefreshToken)
      .insert(refresh)
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.apiConfigService.app?.jwt.secret,
        expiresIn: '7d',
      }),
      refresh_token: refresh.refreshToken,
    } as TokenResponseDto;
  }
}
