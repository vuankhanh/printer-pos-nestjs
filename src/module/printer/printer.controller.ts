import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { ConfigService } from '@nestjs/config';
import { OrderDto } from 'src/shared/dto/order.dto';
import { IFooterTemplate, Template } from 'src/shared/interface/template.interface';

@Controller('print')
export class PrinterController {
  constructor(
    private configService: ConfigService,
    private readonly printerService: PrinterService,
  ) { }
  
  @Post('') 
  @UsePipes(ValidationPipe)
  async print(@Body('order') orderDto: OrderDto) {
    const footer: IFooterTemplate = this.configService.get<IFooterTemplate>('brand');
    const template: Template = new Template(orderDto, footer);
    const pdf = await this.printerService.print(template);
    return pdf;
  }
}