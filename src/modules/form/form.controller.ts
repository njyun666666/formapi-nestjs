import { FormService } from './form.service';
import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { FormClassEnum, FormPageActionEnum } from 'src/common/enums/form.enum';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('application-list')
  applicationList(@User('uid') uid: string) {
    return this.formService.getApplicationList(uid);
  }

  @Get('check-auth/:formPageAction/:formClass')
  checkAuth(
    @User('uid') uid: string,
    @Param('formPageAction') formPageAction: FormPageActionEnum,
    @Param('formClass') formClass: FormClassEnum,
  ) {
    return this.formService.checkAuth(uid, formPageAction, formClass);
  }

  @Get('check-auth/:formPageAction/:formClass/:formId')
  checkAuthFormId(
    @User('uid') uid: string,
    @Param('formPageAction') formPageAction: FormPageActionEnum,
    @Param('formClass') formClass: FormClassEnum,
    @Param('formId') formId: string,
  ) {
    return `${formPageAction}/${formClass}`;
  }
}
