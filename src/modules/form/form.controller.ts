import { FormService } from './form.service';
import { Controller, Get } from '@nestjs/common';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('application-list')
  applicationList() {
    return this.formService.getApplicationList();
  }
}
