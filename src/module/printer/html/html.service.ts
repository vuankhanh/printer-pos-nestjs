import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { VietqrService } from '../vietqr/vietqr.service';
import { ITemplate } from 'src/shared/interface/template.interface';
import { IOrder } from 'src/shared/interface/order.interface';

@Injectable()
export class HtmlService {
  constructor(
    private vietqrService: VietqrService
  ) { }
  async mapToHtml(data: ITemplate, html: string) {
    const $ = cheerio.load(html);
    $('#cus_name').text(data.order.customerName);
    $('#cus_phone_number').text(data.order.customerPhoneNumber);
    $('#cus_address').text(data.order.customerDeliveryAddress);
    $('#order').html(this.createOrderList(data.order));
    $('#order_total_bill').html(await this.createTotalBill(data.order));

    $('#footer_brand_name').text(data.footer.brandName);
    $('#footer_brand_phone_number').text(data.footer.phoneNumber);
    $('#footer_brand_fanpage').text(data.footer.fanpage);
    $('#footer_brand_website').text(data.footer.website);

    return $.html();
  }

  private createOrderList(order: IOrder): string {
    let orderList = `<tr>
    <th>Sản phẩm</th>
    <th>SL</th>
    <th>Đơn giá</th>
    <th>Thành tiền</th>
    </tr>
    `;

    order.orderItems.forEach(item => {
      orderList += `<tr>
        <td>${item.productName}</td>
        <td>${item.quantity} ${item.unit}</td>
        <td>${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
        <td>${(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
      </tr>`;
    });

    const orderTableElement = `<table class="order-table">${orderList}</table>`;
    
    return orderTableElement;
  }

  private async createTotalBill(order: IOrder): Promise<string> {
    const subTotal = order.subTotal;
    const deliveryFee = order.deliveryFee;
    const discount = order.discount;
    const total = order.total;
    
    const qrcode = await this.vietqrService.createVietQRCode(total, order.orderCode);
    
    const paymentQrCodeElement = `
    <div class="qr-code-container">
      <img class="qr-code-img" src="${qrcode}"/>
    </div>
    `;
    
    const orderTotalBillTableElement = `
    <div class="info-list">
      <div class="info-list__item">
        <div class="info-list__item__label">Tổng tiền hàng: </div>
        <div class="info-list__item__value">${subTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
      </div>
      <div class="info-list__item">
        <div class="info-list__item__label">Phí vận chuyển: </div>
        <div class="info-list__item__value">${deliveryFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
      </div>
      <div class="info-list__item">
        <div class="info-list__item__label">Chiết khấu: </div>
        <div class="info-list__item__value">${discount + '%'}</div>
      </div>
      <div class="info-list__item">
        <div class="info-list__item__label">Tổng cộng: </div>
        <div class="info-list__item__value"><b>${total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></div>
      </div>
    </div>
    `;
    
    return paymentQrCodeElement + orderTotalBillTableElement
  }
}
