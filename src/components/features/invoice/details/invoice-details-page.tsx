"use client";

import { InvoiceDetailsData } from "./invoice-details-types";
import { InvoiceDetailsHeader } from "./invoice-details-header";
import { InvoiceDetailsItems } from "./invoice-details-items";
import { InvoiceDetailsSummary } from "./invoice-details-summary";

type InvoiceDetailsPageProps = {
  invoice: InvoiceDetailsData;
};

export function InvoiceDetailsPage({ invoice }: InvoiceDetailsPageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-6">
      <div className="space-y-6">
        <InvoiceDetailsHeader invoice={invoice} />
        <div className="grid grid-cols-1 gap-6">
          <InvoiceDetailsItems items={invoice.items} />
          <InvoiceDetailsSummary invoice={invoice} />
        </div>
      </div>
    </main>
  );
}
