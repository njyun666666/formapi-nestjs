import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbMenu } from 'src/db/FormDB/entities/TbMenu';

@Module({
  imports: [TypeOrmModule.forFeature([TbMenu])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
