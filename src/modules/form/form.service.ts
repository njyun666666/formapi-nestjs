import { ApplicationListDto } from './dto/application-list.dto';
import { FormAuth } from './dto/form-auth.dto';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { FormClassEnum } from 'src/common/enums/form.enum';
import { RoleEnum } from 'src/common/enums/role.enums';
import { TbFormAuth } from 'src/db/FormDB/entities/TbFormAuth';
import { TbFormClass } from 'src/db/FormDB/entities/TbFormClass';
import { TbOrgUser } from 'src/db/FormDB/entities/TbOrgUser';
import { Brackets, DataSource, In } from 'typeorm';

@Injectable()
export class FormService {
  constructor(private dataSource: DataSource) {}

  async getApplicationList(uid: string) {
    const tbFormClass = this.dataSource.getRepository(TbFormClass);
    const formList = await this.getFormAuthList(uid);
    const applicationAuthList = formList
      .filter((form) => form.application)
      .map((x) => x.formClass);

    const forms = await tbFormClass.find({
      where: {
        formClass: In(applicationAuthList),
      },
    });

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

  async getFormAuthList(uid: string, formClass?: FormClassEnum) {
    const tbFormAuth = this.dataSource.getRepository(TbFormAuth);
    const tbOrgUser = this.dataSource.getRepository(TbOrgUser);

    const user = await tbOrgUser.find({
      where: { uid: uid },
      relations: {
        tbOrgDeptUsers: true,
        tbOrgRoles: true,
      },
    });

    const deptList: string[] = user.reduce((prev, curr) => {
      prev.push(...curr.tbOrgDeptUsers.map((dept) => dept.deptId));
      return prev;
    }, [] as string[]);

    const roleList: string[] = user.reduce((prev, curr) => {
      prev.push(...curr.tbOrgRoles.map((role) => role.rid));
      return prev;
    }, [] as string[]);

    const formAuthList = await tbFormAuth
      .createQueryBuilder()
      .select(':uid', 'uid')
      .addSelect('formClass')
      .addSelect('max(application)', 'application')
      .addSelect('max(readAll)', 'readAll')
      .where(() => {
        if (formClass) return 'FormClass = :FormClass';
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where(`(AuthType=3 and TargetId = :everyone)`)
            .orWhere(`(AuthType=1 and TargetId = :uid)`)
            .orWhere(`(AuthType=2 and TargetId in (:...deptIds))`)
            .orWhere(`(AuthType=3 and TargetId in (:...roleIds))`);
        }),
      )
      .groupBy('FormClass')
      .setParameters({
        FormClass: formClass,
        everyone: RoleEnum.everyone,
        uid: uid,
        deptIds: deptList,
        roleIds: roleList,
      })
      .getRawMany<FormAuth>();

    if (formClass && formAuthList.length == 0) {
      const f = new FormAuth();
      f.uid = uid;
      f.formClass = formClass;
      f.application = false;
      f.readAll = false;
      formAuthList.push(f);
    }

    return formAuthList;
  }
}
