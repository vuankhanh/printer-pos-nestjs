import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { PrinterModule } from './module/printer/printer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    PrinterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;
  constructor(
    private configService: ConfigService
  ) {
    AppModule.port = this.configService.get<number>('app.port');
  }
}
