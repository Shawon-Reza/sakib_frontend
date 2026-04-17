import { CalendarDays, Clock3, FileText, UserRound } from "lucide-react";

import { InvoiceDetailsData } from "./invoice-details-types";
import { currency } from "../utils";

type InvoiceDetailsHeaderProps = {
  invoice: InvoiceDetailsData;
};

const statusStyles: Record<InvoiceDetailsData["status"], string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Partial: "bg-amber-50 text-amber-700 ring-amber-200",
  Due: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function InvoiceDetailsHeader({ invoice }: InvoiceDetailsHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 px-4 py-5 text-white sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.16em] text-white/80 uppercase">
              <FileText className="size-3.5" />
              Invoice Details
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {invoice.invoiceNo}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-white/70 sm:text-base">
                Clean invoice overview with customer information, item breakdown, and payment status.
              </p>
            </div>
          </div>

          <div className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${statusStyles[invoice.status]}`}>
            {invoice.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <UserRound className="size-4" />
            Customer
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900">{invoice.customerName}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CalendarDays className="size-4" />
            Invoice Date
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900">{invoice.invoiceDate}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock3 className="size-4" />
            Total Amount
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900">{currency(invoice.totalAmount)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock3 className="size-4" />
            Due Amount
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900">{currency(invoice.dueAmount)}</p>
        </div>
      </div>
    </section>
  );
}
