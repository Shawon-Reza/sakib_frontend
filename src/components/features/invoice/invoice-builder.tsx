"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { InvoiceCustomerSection } from "./invoice-customer-section";
import { InvoiceDueDetails } from "./invoice-due-details";
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
  const [referenceInvoiceNos, setReferenceInvoiceNos] = useState<string[]>([
    "",
  ]);
  const [previousDue, setPreviousDue] = useState("0");
  const [receivedAmount, setReceivedAmount] = useState("0");
  const [items, setItems] = useState<InvoiceItem[]>([createItem()]);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        return sum + toNumber(item.quantity) * toNumber(item.rate);
      }, 0),
    [items]
  );

  const previousDueAmount = toNumber(previousDue);
  const received = toNumber(receivedAmount);
  const grossTotal = subtotal + previousDueAmount;
  const netDue = Math.max(grossTotal - received, 0);

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

  const updateReferenceInvoice = (index: number, value: string) => {
    setReferenceInvoiceNos((prev) =>
      prev.map((invoiceNo, idx) => (idx === index ? value : invoiceNo))
    );
  };

  const addReferenceInvoice = () => {
    setReferenceInvoiceNos((prev) => [...prev, ""]);
  };

  const removeReferenceInvoice = (index: number) => {
    setReferenceInvoiceNos((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, idx) => idx !== index);
    });
  };

  const referenceInvoicesText = referenceInvoiceNos
    .map((invoiceNo) => invoiceNo.trim())
    .filter(Boolean)
    .join(", ");

    
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
      },
      referenceInvoiceNos: referenceInvoiceNos
        .map((invoiceNo) => invoiceNo.trim())
        .filter(Boolean),
      previousDue: previousDueAmount,
      receivedAmount: received,
      items: formattedItems,
      summary: {
        subtotal,
        grossTotal,
        netDue,
      },
      createdAt: new Date().toISOString(),
    };

    console.log("Create invoice payload:", payload);
    console.table(formattedItems);
  };

  return (
    <main className=" py-4 sm:px-5 sm:py-6 container mx-auto">
      <section className="mx-auto w-full  rounded-2xl border bg-white shadow-sm">
        <InvoiceHeader />

        <div className="space-y-5 px-4 py-5 sm:px-6">
          <InvoiceCustomerSection
            billNo={billNo}
            invoiceDate={invoiceDate}
            customerName={customerName}
            customerAddress={customerAddress}
            onBillNoChange={setBillNo}
            onInvoiceDateChange={setInvoiceDate}
            onCustomerNameChange={setCustomerName}
            onCustomerAddressChange={setCustomerAddress}
          />

          <InvoiceItemsSection
            items={items}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onUpdateItem={updateItem}
          />

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <InvoiceDueDetails
              referenceInvoiceNos={referenceInvoiceNos}
              previousDue={previousDue}
              receivedAmount={receivedAmount}
              onAddReferenceInvoice={addReferenceInvoice}
              onRemoveReferenceInvoice={removeReferenceInvoice}
              onReferenceInvoiceChange={updateReferenceInvoice}
              onPreviousDueChange={setPreviousDue}
              onReceivedAmountChange={setReceivedAmount}
            />

            <InvoiceSummaryCard
              billNo={billNo}
              invoiceDate={invoiceDate}
              referenceInvoicesText={referenceInvoicesText}
              summary={{
                subtotal,
                previousDueAmount,
                grossTotal,
                received,
                netDue,
              }}
            />
          </section>

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
