import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
