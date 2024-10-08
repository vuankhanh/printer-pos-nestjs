import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { ConfigService } from '@nestjs/config';
import { HtmlModule } from '../html/html.module';

@Module({
  imports: [
    HtmlModule,
  ],
  providers: [ConfigService, PdfService],
  exports: [PdfService]
})
export class PdfModule {}
