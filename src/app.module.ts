import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { PrinterModule } from './module/printer/printer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env', //Phải định nghĩa mặc định ở đây vì khi chạy pm2 thì location (the project root directory) sẽ khác
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
