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
import { LoginDto } from './dto/login.dto';
import { LoginGuard } from './login.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() data: LoginDto) {
    return this.loginService.login(data);
  }

  //   @UseGuards(LoginGuard)
  @Public()
  @Get('test')
  test() {
    return 'a';
  }
}
