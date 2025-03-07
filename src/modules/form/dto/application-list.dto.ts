import { FormClassEnum } from 'src/common/enums/form.enum';

export class ApplicationListDto {
  groupId: string;
  list: {
    formClass: string;
  }[];
}
