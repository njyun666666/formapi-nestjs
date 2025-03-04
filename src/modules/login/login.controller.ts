import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Public()
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() data: LoginDto) {
    return this.loginService.login(data);
  }

  // @Roles(Role.Admin, Role.User)
  @Get('test')
  test() {
    return 'a';
  }
}
