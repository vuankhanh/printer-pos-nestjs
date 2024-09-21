import { Module } from '@nestjs/common';
import { VietqrService } from './vietqr.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, VietqrService],
  exports: [VietqrService]
})
export class VietqrModule {}
