export type InvoiceItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  rate: string;
};

export type InvoiceSummary = {
  subtotal: number;
  previousDueAmount: number;
  grossTotal: number;
  received: number;
  netDue: number;
};
