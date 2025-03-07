import { FormService } from './form.service';
import { Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('application-list')
  applicationList(@User('uid') uid: string) {
    return this.formService.getApplicationList(uid);
  }
}
