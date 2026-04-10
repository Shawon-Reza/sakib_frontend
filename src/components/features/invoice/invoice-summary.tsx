import { InvoiceSummary } from "./types";
import { currency } from "./utils";

type InvoiceSummaryCardProps = {
  billNo: string;
  invoiceDate: string;
  referenceInvoicesText: string;
  summary: InvoiceSummary;
};

export function InvoiceSummaryCard({
  billNo,
  invoiceDate,
  referenceInvoicesText,
  summary,
}: InvoiceSummaryCardProps) {
  return (
    <div className="rounded-xl border p-3 sm:p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Bill Summary</h3>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Products Total</dt>
          <dd className="font-medium">{currency(summary.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Previous Due</dt>
          <dd className="font-medium">{currency(summary.previousDueAmount)}</dd>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <dt className="text-slate-600">Gross Total</dt>
          <dd className="font-semibold">{currency(summary.grossTotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Received Amount</dt>
          <dd className="font-medium">{currency(summary.received)}</dd>
        </div>
        <div className="flex items-center justify-between text-base">
          <dt className="font-semibold text-slate-900">Net Due</dt>
          <dd className="font-bold text-slate-900">{currency(summary.netDue)}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-700">
        <p>
          Bill No: <span className="font-semibold text-slate-900">{billNo || "-"}</span>
        </p>
        <p className="mt-1">
          Date: <span className="font-semibold text-slate-900">{invoiceDate || "-"}</span>
        </p>
        <p className="mt-1">
          Ref Invoice: <span className="font-semibold text-slate-900">{referenceInvoicesText || "N/A"}</span>
        </p>
      </div>
    </div>
  );
}
