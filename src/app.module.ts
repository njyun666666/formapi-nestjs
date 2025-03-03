import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './config/api-config.service';
import { LoginController } from './modules/login/login.controller';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoginService } from './modules/login/login.service';
import { LoginModule } from './modules/login/login.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { LoginGuard } from './modules/login/login.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
    }),
    CommonModule,
    AuthModule,
    LoginModule,
  ],
  controllers: [LoginController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    AppService,
  ],
})
export class AppModule {}
