import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';
import { HtmlService } from '../html/html.service';
import { ITemplate } from 'src/shared/interface/template.interface';
import { FileUtil } from 'src/shared/utitl/file.util';

@Injectable()
export class PdfService {
  private printerSize = {
    width: '100mm',
    height: '150mm'
  }
  constructor(
    private configService: ConfigService,
    private htmlService: HtmlService
  ) {
    this.initPrinterSize();
  }

  private initPrinterSize() {
    this.printerSize = {
      width: this.configService.get<string>('printer.size.width'),
      height: this.configService.get<string>('printer.size.height')
    }
  }
  async createPdfFromHTML(html: string, data: ITemplate): Promise<{
    buffer: Uint8Array,
    filePath: string
  }> {
    // Khởi tạo trình duyệt Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {

      const mappedHtml = await this.htmlService.mapToHtml(data, html);

      FileUtil.write('mapped.html', mappedHtml);
      // Thiết lập nội dung HTML cho trang
      await page.setContent(mappedHtml);
      
      const temporaryFolder = this.configService.get<string>('folder.temporary');
      await FileUtil.ensureDir(temporaryFolder);
      const orderCode = data.order.orderCode;

      const filePath = temporaryFolder + `/${orderCode}.pdf`;
      // Chuyển đổi HTML thành PDF buffer với kích thước tùy chỉnh
      const buffer = await page.pdf({
        path: filePath, // Output the result in a local file
        width: this.printerSize.width,
        height: this.printerSize.height
      });

      // Đóng trình duyệt
      await browser.close();
      return Promise.resolve({
        buffer,
        filePath
      });
    } catch (error) {
      await browser.close();
      return Promise.reject(error);
    }
  }
}