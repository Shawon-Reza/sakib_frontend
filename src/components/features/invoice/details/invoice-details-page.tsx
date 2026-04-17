"use client";

import Swal from "sweetalert2";

import { InvoiceDetailsData } from "./invoice-details-types";
import { InvoiceDetailsHeader } from "./invoice-details-header";
import { InvoiceDetailsItems } from "./invoice-details-items";
import { InvoiceDetailsSummary } from "./invoice-details-summary";

type InvoiceDetailsPageProps = {
  invoice: InvoiceDetailsData;
};

// ================ Handle delete invoice action ================ \\
const handleDeleteInvoice = (invoiceId: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#141e32",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Invoice has been deleted.",
        icon: "success"
      });

      console.log(`Delete invoice with ID: ${invoiceId}`);
    }
  });
};

export function InvoiceDetailsPage({ invoice }: InvoiceDetailsPageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-6">
      <div className="space-y-6">
        <InvoiceDetailsHeader
          invoice={invoice}
          onDelete={() => handleDeleteInvoice(invoice.id)}
        />
        <div className="grid grid-cols-1 gap-6">
          <InvoiceDetailsItems items={invoice.items} />
          <InvoiceDetailsSummary invoice={invoice} />
        </div>
      </div>
    </main>
  );
}
