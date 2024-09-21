import { IOrder } from "./order.interface";

export interface ITemplate {
  order: IOrder;
  footer: IFooterTemplate;
}

export interface IFooterTemplate {
  brandName: string;
  address: string;
  phoneNumber: string;
  email: string;
  fanpage: string;
  website: string;
}

export class Template implements ITemplate {
  order: IOrder;
  footer: IFooterTemplate;

  constructor(order: IOrder, footer: IFooterTemplate) {
    this.order = order;
    this.footer = footer;
  }
}