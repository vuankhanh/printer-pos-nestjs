import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as print from 'pdf-to-printer';
import * as os from 'os';
import { exec } from 'child_process';
import { PdfService } from './pdf/pdf.service';
import { Template } from 'src/shared/interface/template.interface';
import { FileUtil } from 'src/shared/utitl/file.util';

@Injectable()
export class PrinterService {
  constructor(
    private configService: ConfigService,
    private readonly pdfService: PdfService,
  ) { }

  async print(temp: Template): Promise<Uint8Array> {
    const printerName = this.configService.get<string>('printer.name');
    const assetsFolder = this.configService.get<string>('folder.assets');
    
    const htmlFile = assetsFolder+`/template/template_${temp.order.customerPhoneNumber  ? 'default' : 'walk_in_customer'}.html` 

    const readHtml = await FileUtil.read(htmlFile); 
    const result = await this.pdfService.createPdfFromHTML(readHtml, temp);
    
    await this.printPdf(result.filePath, printerName).then(async _ => {
      await FileUtil.remove(result.filePath);
    });

    return result.buffer;
  }

  private printPdf(pdfPath: string, printerName: string) {
    const osType = os.type();
    
    if (osType === 'Windows_NT') {
      return this.printPdfWindows(pdfPath, printerName);
    } else if (osType === 'Linux' || osType === 'Darwin') {
      return this.printPdfLinux(pdfPath, printerName);
    } else {
      return Promise.reject(new Error('Operating System not supported'));
    }
  }

  printPdfWindows(pdfPath: string, printerName: string) {
    return print.print(pdfPath, { printer: printerName });
  }

  printPdfLinux(pdfPath: string, printerName: string) {
    return new Promise((resolve, reject) => {
      printerName = printerName.replace(/\s/g, '');
      const command = `lp -d ${printerName} ${pdfPath}`
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error printing file: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}