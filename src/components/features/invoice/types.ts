export type InvoiceItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  rate: string;
};

export type InvoiceSummary = {
  totalAmount: number;
  receiveAmount: number;
  dueAmount: number;
};
