import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SubmitFormDto } from './dto/form.dto';

@Controller()
export class AppController {
  private readonly filePath: string;

  constructor(private appService: AppService) {}

  @Post('/')
  async submitForm(@Body() body: SubmitFormDto) {
    return await this.appService.submitForm(body);
  }
}
