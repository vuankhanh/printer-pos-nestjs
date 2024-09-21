import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FileUtil } from 'src/shared/utitl/file.util';

@Injectable()
export class VietqrService {
  private urlVietQR: string;
  private bankId: string;
  private accountNo: string;
  private template: string;
  private accountName: string;
  constructor(
    private configService: ConfigService
  ) {
    this.initPaymentAccountHolder();
  }

  private initPaymentAccountHolder() {
    this.urlVietQR = this.configService.get<string>('vietQR.url');
    this.template = this.configService.get<string>('vietQR.defaultTemplate');
    this.bankId = this.configService.get<string>('paymentAccountHolder.bankId');
    this.accountNo = this.configService.get<string>('paymentAccountHolder.accountNumber');
    this.accountName = this.configService.get<string>('paymentAccountHolder.accountName');
  }

  async createVietQRCode(amount: number, description: string): Promise<string | ArrayBuffer> {
    const url = `${this.urlVietQR}/image/${this.bankId}-${this.accountNo}-${this.template}.jpg`;
    const params = {
      amount: amount,
      addInfo: description,
      accountName: this.accountName
    };

    try {
      const response = await axios.get(url, { params, responseType: 'arraybuffer' });
      const blob = response.data;

      const buffer = Buffer.from(blob, 'binary'); // Chuyển đổi dữ liệu thành buffer
      const base64Image = buffer.toString('base64'); // Chuyển đổi buffer thành base64 string

      // Trả về base64 string dưới dạng Data URL
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error(`error`);
      
      const assetsFolder = this.configService.get<string>('folder.assets');
      const defaultQrCode = assetsFolder + '/img/default_qr_code.png';
      const dataFile = await FileUtil.read(defaultQrCode, 'base64');
      return `data:image/jpeg;base64,${dataFile}`;
    }
  }
}
