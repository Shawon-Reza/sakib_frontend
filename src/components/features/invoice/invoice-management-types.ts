export type InvoicePaymentStatus = "Paid" | "Partial" | "Due";

export type InvoiceListItem = {
  id: string;
  invoiceNo: string;
  customerName: string;
  invoiceDate: string;
  itemCount: number;
  grossTotal: number;
  dueAmount: number;
  status: InvoicePaymentStatus;
  referenceInvoiceNos: string[];
};
