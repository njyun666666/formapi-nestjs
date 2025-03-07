import { ApplicationListDto } from './dto/application-list.dto';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { TbFormClass } from 'src/db/FormDB/entities/TbFormClass';
import { DataSource } from 'typeorm';

@Injectable()
export class FormService {
  constructor(private dataSource: DataSource) {}

  async getApplicationList() {
    const tbFormClass = this.dataSource.getRepository(TbFormClass);
    const forms = await tbFormClass.find();
    const group = _.groupBy(forms, 'groupId');

    return Object.entries(group).map(([key, val]) => {
      const g = new ApplicationListDto();
      g.groupId = key;
      g.list = val.map((formClass) => {
        return {
          formClass: formClass.formClass,
        };
      });

      return g;
    });
  }
}
