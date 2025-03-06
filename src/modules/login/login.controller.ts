import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() data: LoginDto) {
    return this.loginService.login(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(@Body() data: RefreshTokenDto) {
    return this.loginService.refreshToken(data);
  }
}
