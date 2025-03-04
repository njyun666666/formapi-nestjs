import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get app() {
    return this.configService.get<AppConfig>('app');
  }

  get database() {
    return this.configService.get<DatabaseConfig>('database');
  }
}
