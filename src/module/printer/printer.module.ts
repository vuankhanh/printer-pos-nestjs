import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterController } from './printer.controller';
import { ConfigService } from '@nestjs/config';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [PdfModule],
  controllers: [PrinterController],
  providers: [ConfigService, PrinterService],
  exports: [PrinterService],
})
export class PrinterModule {}
