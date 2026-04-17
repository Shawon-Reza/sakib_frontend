"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { InvoiceCustomerSection } from "./invoice-customer-section";
import { InvoiceHeader } from "./invoice-header";
import { InvoiceItemsSection } from "./invoice-items-section";
import { InvoiceSummaryCard } from "./invoice-summary";
import { InvoiceItem } from "./types";
import { createItem, dateIso, toNumber } from "./utils";

export function InvoiceBuilder() {
  const [billNo, setBillNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(dateIso);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([createItem()]);
  const [receiveAmount, setReceiveAmount] = useState("0");

  const totalAmount = useMemo(
    () =>
      items.reduce((sum, item) => {
        return sum + toNumber(item.quantity) * toNumber(item.rate);
      }, 0),
    [items]
  );

  const receivedAmount = toNumber(receiveAmount);
  const dueAmount = Math.max(totalAmount - receivedAmount, 0);

  const updateItem = (
    id: string,
    key: keyof Omit<InvoiceItem, "id">,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, createItem()]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      if (prev.length === 1) {
        return prev;
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleCreateInvoice = () => {
    const formattedItems = items.map((item, index) => {
      const quantity = toNumber(item.quantity);
      const rate = toNumber(item.rate);

      return {
        serial: index + 1,
        name: item.name,
        quantity,
        unit: item.unit,
        rate,
        amount: quantity * rate,
      };
    });

    const payload = {
      billNo,
      invoiceDate,
      customer: {
        name: customerName,
        address: customerAddress,
        phone: customerPhone,
      },
      items: formattedItems,
      summary: {
        totalAmount,
        receiveAmount: receivedAmount,
        dueAmount,
      },
      createdAt: new Date().toISOString(),
    };

    console.log("Create invoice payload:", payload);
    console.table(formattedItems);
  };

  return (
    <main className=" py-4 sm:px-5 sm:py-6 container mx-auto max-w-5xl">
      <section className="mx-auto w-full  rounded-2xl border bg-white shadow-sm">
        <InvoiceHeader />

        <div className="space-y-5 px-4 py-5 sm:px-6">
          <InvoiceCustomerSection
            billNo={billNo}
            invoiceDate={invoiceDate}
            customerName={customerName}
            customerAddress={customerAddress}
            customerPhone={customerPhone}
            onBillNoChange={setBillNo}
            onInvoiceDateChange={setInvoiceDate}
            onCustomerNameChange={setCustomerName}
            onCustomerAddressChange={setCustomerAddress}
            onCustomerPhoneChange={setCustomerPhone}
          />

          <InvoiceItemsSection
            items={items}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onUpdateItem={updateItem}
          />

          <InvoiceSummaryCard
            billNo={billNo}
            invoiceDate={invoiceDate}
            summary={{
              totalAmount,
              receiveAmount: receivedAmount,
              dueAmount,
            }}
            receiveAmount={receiveAmount}
            onReceiveAmountChange={setReceiveAmount}
          />

          <div className="flex justify-end">
            <Button type="button" size="lg" onClick={handleCreateInvoice}>
              Create Invoice
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
