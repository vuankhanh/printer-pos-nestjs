import { OrderStatus } from "src/constant/status.constant";
import { TPaymentMethod } from "./payment.interface";

export type TOrderStatus = `${OrderStatus}`;

export interface IOrder {
  orderCode: string;
  orderItems: IOrderItem[];
  status: TOrderStatus;
  subTotal: number;
  total: number;
  discount: number;
  deliveryFee: number;
  paymentMethod: TPaymentMethod;
  customerName?: string;
  customerPhoneNumber?: string;
  customerAddress?: string;
  customerDeliveryAddress?: string;
  note: string;
}

export interface IOrderItem {
  productThumbnail: string;
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}