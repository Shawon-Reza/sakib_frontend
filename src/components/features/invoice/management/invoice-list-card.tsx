import Link from "next/link";
import { CalendarDays, FileText, ReceiptText, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

import { InvoiceListItem, InvoicePaymentStatus } from "../invoice-management-types";
import { currency } from "../utils";

type InvoiceListCardProps = {
  invoice: InvoiceListItem;
};

const statusStyles: Record<InvoicePaymentStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Partial: "bg-amber-50 text-amber-700 ring-amber-200",
  Due: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusAccent: Record<InvoicePaymentStatus, string> = {
  Paid: "from-emerald-400/20 to-emerald-100/5",
  Partial: "from-amber-400/20 to-amber-100/5",
  Due: "from-rose-400/20 to-rose-100/5",
};

export function InvoiceListCard({ invoice }: InvoiceListCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${statusAccent[invoice.status]}`} />

      <div className="border-b border-slate-200 bg-slate-50/80 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              Invoice No
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              {invoice.invoiceNo}
            </h2>
          </div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[invoice.status]}`}
          >
            {invoice.status}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-slate-500" />
            <span className="truncate">{invoice.customerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-slate-500" />
            <span>{invoice.invoiceDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <ReceiptText className="size-4 text-slate-500" />
            <span>{invoice.itemCount} items</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-slate-500" />
            <span className="truncate">
              Ref: {invoice.referenceInvoiceNos.length > 0 ? invoice.referenceInvoiceNos.join(", ") : "N/A"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div>
            <p className="text-xs text-slate-500">Gross Total</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {currency(invoice.grossTotal)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Due Amount</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {currency(invoice.dueAmount)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button asChild variant="outline" size="sm">
            <Link href={`/invoices/${invoice.id}`}>View</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
