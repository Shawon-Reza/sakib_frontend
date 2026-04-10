import { InvoiceManagementPage } from "@/components/features/invoice/invoice-management-page";
import { InvoiceListItem } from "@/components/features/invoice/invoice-management-types";
import { Navbar1 } from "@/components/navbar1";
import { div } from "framer-motion/client";

// Replace this with backend response data.
const invoices: InvoiceListItem[] = [
  {
    id: "inv-1001",
    invoiceNo: "KH-021",
    customerName: "MS MADINA ENTERPRISE & LACQUER CENTER",
    invoiceDate: "2026-01-22",
    itemCount: 14,
    grossTotal: 321420,
    dueAmount: 321420,
    status: "Due",
    referenceInvoiceNos: ["INV-0098", "INV-0102"],
  },
  {
    id: "inv-1002",
    invoiceNo: "KH-022",
    customerName: "Sadar Paint House",
    invoiceDate: "2026-02-01",
    itemCount: 7,
    grossTotal: 102400,
    dueAmount: 20400,
    status: "Partial",
    referenceInvoiceNos: ["INV-0101"],
  },
  {
    id: "inv-1003",
    invoiceNo: "KH-023",
    customerName: "Bestova Traders",
    invoiceDate: "2026-02-08",
    itemCount: 4,
    grossTotal: 78300,
    dueAmount: 0,
    status: "Paid",
    referenceInvoiceNos: [],
  },
  {
    id: "inv-1004",
    invoiceNo: "KH-021",
    customerName: "MS MADINA ENTERPRISE & LACQUER CENTER",
    invoiceDate: "2026-01-22",
    itemCount: 14,
    grossTotal: 321420,
    dueAmount: 321420,
    status: "Due",
    referenceInvoiceNos: ["INV-0098", "INV-0102"],
  },
  {
    id: "inv-1005",
    invoiceNo: "KH-022",
    customerName: "Sadar Paint House",
    invoiceDate: "2026-02-01",
    itemCount: 7,
    grossTotal: 102400,
    dueAmount: 20400,
    status: "Partial",
    referenceInvoiceNos: ["INV-0101"],
  },
  {
    id: "inv-1006",
    invoiceNo: "KH-023",
    customerName: "Bestova Traders",
    invoiceDate: "2026-02-08",
    itemCount: 4,
    grossTotal: 78300,
    dueAmount: 0,
    status: "Paid",
    referenceInvoiceNos: [],
  },
];

// bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)]
export default function InvoicesPage() {
  return (
    <div className="bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)]">
      <section className="mb-17">
        <Navbar1 className="scale-110 border-b  fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur " />
      </section>
      <InvoiceManagementPage invoices={invoices} />
    </div>
  )
}