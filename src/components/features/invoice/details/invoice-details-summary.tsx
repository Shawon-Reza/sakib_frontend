"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ReceiptText, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { InvoiceDetailsData } from "./invoice-details-types";
import { currency, toNumber } from "../utils";

type InvoiceDetailsSummaryProps = {
  invoice: InvoiceDetailsData;
};

export function InvoiceDetailsSummary({ invoice }: InvoiceDetailsSummaryProps) {
  const [receiveAmount, setReceiveAmount] = useState("");

  const payableAmount = useMemo(() => {
    const enteredReceiveAmount = toNumber(receiveAmount);
    return Math.max(invoice.dueAmount - enteredReceiveAmount, 0);
  }, [invoice.dueAmount, receiveAmount]);

  const handlePay = () => {
    console.log("Pay invoice due", {
      invoiceId: invoice.id,
      receiveAmount: toNumber(receiveAmount),
      remainingDue: payableAmount,
    });
  };

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Bill Summary</h2>
            <p className="mt-1 text-sm text-slate-600">A compact overview of the invoice value and payment balance.</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
            <ReceiptText className="size-5" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Total</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{currency(invoice.totalAmount)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Received</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{currency(invoice.receiveAmount)}</p>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-rose-500">Due</p>
            <p className="mt-2 text-xl font-semibold text-rose-700">{currency(invoice.dueAmount)}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-medium text-slate-600">Subtotal</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currency(invoice.subtotal)}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-medium text-slate-600">VAT</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currency(invoice.vat)}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-medium text-slate-600">Discount</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currency(invoice.discount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
            <Wallet className="size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Receive Payment</h3>
            <p className="mt-1 text-sm text-slate-600">Enter amount only when due exists.</p>
          </div>
        </div>

        {invoice.dueAmount > 0 ? (
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="receive-amount">Receive Money</Label>
              <Input
                id="receive-amount"
                type="number"
                min="0"
                placeholder="Enter receive amount"
                value={receiveAmount}
                onChange={(event) => setReceiveAmount(event.target.value)}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Due After Payment</span>
                <span className="font-semibold text-slate-900">{currency(payableAmount)}</span>
              </div>
              <p className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                This value is calculated from current due and entered receive amount.
              </p>
            </div>

            <Button type="button" className="w-full" onClick={handlePay} disabled={!receiveAmount || toNumber(receiveAmount) <= 0}>
              Pay Due
            </Button>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            This invoice is fully paid. No receive amount is required.
          </div>
        )}
      </div>
    </section>
  );
}
