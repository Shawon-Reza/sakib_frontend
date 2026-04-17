"use client";

import { InvoiceListItem, InvoicePaymentStatus } from "@/components/features/invoice/invoice-management-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, ChevronRight } from "lucide-react";
import { currency } from "@/components/features/invoice/utils";

type UserInvoicesProps = {
  invoices: InvoiceListItem[];
  userId: string;
};

const statusStyles: Record<InvoicePaymentStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Partial: "bg-amber-50 text-amber-700 ring-amber-200",
  Due: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusDot: Record<InvoicePaymentStatus, string> = {
  Paid: "bg-emerald-500",
  Partial: "bg-amber-500",
  Due: "bg-rose-500",
};

export function UserInvoicesSection({ invoices, userId }: UserInvoicesProps) {
  if (invoices.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-12 text-center sm:px-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-slate-100 p-3">
              <Eye className="h-6 w-6 text-slate-400" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">No Invoices</h3>
          <p className="mt-2 text-sm text-slate-600">This user hasn't created any invoices yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 bg-linear-to-r from-slate-50 to-slate-100 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Invoice History</h2>
            <p className="mt-1 text-sm text-slate-600">{invoices.length} invoices</p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={`/invoices`}>
              View All Invoices
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Invoice No</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Items</th>
              <th className="px-6 py-3 text-right font-semibold text-slate-900">Amount</th>
              <th className="px-6 py-3 text-right font-semibold text-slate-900">Due</th>
              <th className="px-6 py-3 text-center font-semibold text-slate-900">Status</th>
              <th className="px-6 py-3 text-center font-semibold text-slate-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">{invoice.invoiceNo}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">{invoice.invoiceDate}</td>
                <td className="px-6 py-4 text-slate-600">{invoice.itemCount} items</td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  {currency(invoice.grossTotal)}
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  {currency(invoice.dueAmount)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[invoice.status]}`}
                  >
                    <span className={`mr-1.5 h-2 w-2 rounded-full ${statusDot[invoice.status]}`} />
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/invoices/${invoice.id}`}>
                      View
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="divide-y divide-slate-200 md:hidden">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="border-b border-slate-200 p-4 last:border-b-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{invoice.invoiceNo}</h3>
                <p className="mt-1 text-xs text-slate-600">{invoice.invoiceDate}</p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[invoice.status]}`}
              >
                <span className={`mr-1.5 h-2 w-2 rounded-full ${statusDot[invoice.status]}`} />
                {invoice.status}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded bg-slate-50 p-2">
                <p className="text-xs text-slate-600">Amount</p>
                <p className="mt-1 font-semibold text-slate-900">{currency(invoice.grossTotal)}</p>
              </div>
              <div className="rounded bg-slate-50 p-2">
                <p className="text-xs text-slate-600">Due</p>
                <p className="mt-1 font-semibold text-slate-900">{currency(invoice.dueAmount)}</p>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-600">
              {invoice.itemCount} items
            </div>

            <div className="mt-3 flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/invoices/${invoice.id}`}>View Invoice</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
