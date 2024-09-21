import { Module } from '@nestjs/common';
import { HtmlService } from './html.service';
import { VietqrModule } from '../vietqr/vietqr.module';
import { VietqrService } from '../vietqr/vietqr.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    VietqrModule,
  ],
  providers: [ConfigService, HtmlService, VietqrService],
  exports: [HtmlService]
})
export class HtmlModule {}
