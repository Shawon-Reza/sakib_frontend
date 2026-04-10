import { InvoiceItem } from "./types";

export const dateIso = new Date().toISOString().slice(0, 10);

export const createItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: "",
  unit: "KG",
  rate: "",
});

export const toNumber = (value: string): number => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const currency = (value: number): string =>
  new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
