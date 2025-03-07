import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MenusGuard } from './common/guards/menus.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { ApiConfigService } from './config/api-config.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { FormModule } from './modules/form/form.module';
import { LoginController } from './modules/login/login.controller';
import { LoginGuard } from './modules/login/login.guard';
import { LoginModule } from './modules/login/login.module';
import { MenusModule } from './modules/menus/menus.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      useFactory: (apiConfigService: ApiConfigService) => ({
        type: 'mysql',
        host: apiConfigService.database?.host,
        port: apiConfigService.database?.port,
        username: apiConfigService.database?.user,
        password: apiConfigService.database?.password,
        database: apiConfigService.database?.database,
        synchronize: false,
        entities: [__dirname + '/db/**/*{.ts,.js}'],
        autoLoadEntities: true,
        logging: apiConfigService.app?.env == 'development',
      }),
      inject: [ApiConfigService],
    }),
    LoginModule,
    MenusModule,
    FormModule,
  ],
  controllers: [LoginController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MenusGuard,
    },
    AppService,
  ],
})
export class AppModule {
  constructor() {}
}
