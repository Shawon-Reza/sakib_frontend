import { CalendarDays, ReceiptText, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

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

export function InvoiceListCard({ invoice }: InvoiceListCardProps) {
  const router = useRouter();

  const handleViewInvoice = () => {
    router.push(`/invoices/${invoice.id}`);
  };

  const stopCardNavigation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={handleViewInvoice}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleViewInvoice();
        }
      }}
    >
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
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[invoice.status]}`}
            >
              {invoice.status}
            </span>
            <Button
              className="cursor-pointer"
              variant="destructive"
              size="sm"
              onClick={(event) => {
                stopCardNavigation(event);
                handleDeleteInvoice(invoice.id);
              }}
            >
              <AiOutlineDelete />
            </Button>
          </div>
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
            <div className="size-4" />
            <span className="text-slate-500">No reference tracking</span>
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
      </div>
    </article>
  );
}
