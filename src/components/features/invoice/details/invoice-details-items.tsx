import { InvoiceDetailsItem } from "./invoice-details-types";
import { currency } from "../utils";

type InvoiceDetailsItemsProps = {
  items: InvoiceDetailsItem[];
};

export function InvoiceDetailsItems({ items }: InvoiceDetailsItemsProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">Invoice Items</h2>
        <p className="mt-1 text-sm text-slate-600">Detailed breakdown of the invoice line items.</p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Item</th>
              <th className="px-6 py-3 text-center font-semibold">Qty</th>
              <th className="px-6 py-3 text-center font-semibold">Unit</th>
              <th className="px-6 py-3 text-right font-semibold">Rate</th>
              <th className="px-6 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{item.name}</p>
                </td>
                <td className="px-6 py-4 text-center text-slate-700">{item.quantity}</td>
                <td className="px-6 py-4 text-center text-slate-700">{item.unit}</td>
                <td className="px-6 py-4 text-right text-slate-700">{currency(item.rate)}</td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">{currency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 md:hidden sm:p-6">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600">{item.quantity} {item.unit}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">{currency(item.amount)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
              <span>Rate</span>
              <span>{currency(item.rate)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
