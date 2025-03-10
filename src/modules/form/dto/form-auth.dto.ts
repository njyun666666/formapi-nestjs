import { FormClassEnum, FormPageActionEnum } from 'src/common/enums/form.enum';

export class FormAuth {
  uid: string;
  formClass: FormClassEnum;
  application: boolean;
  readAll: boolean;
}

export class CheckAuthResponseDto {
  formPageAction: FormPageActionEnum[];
}
