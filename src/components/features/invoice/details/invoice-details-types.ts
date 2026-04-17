import { InvoicePaymentStatus } from "../invoice-management-types";

export type InvoiceDetailsItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
};

export type InvoiceDetailsData = {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  invoiceDate: string;
  status: InvoicePaymentStatus;
  items: InvoiceDetailsItem[];
  subtotal: number;
  vat: number;
  discount: number;
  totalAmount: number;
  receiveAmount: number;
  dueAmount: number;
};
