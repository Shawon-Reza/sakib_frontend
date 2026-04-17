import { InvoiceDetailsPage } from "@/components/features/invoice/details/invoice-details-page";
import { InvoiceDetailsData } from "@/components/features/invoice/details/invoice-details-types";
import { Navbar1 } from "@/components/navbar1";
import { notFound } from "next/navigation";

const invoices: Record<string, InvoiceDetailsData> = {
    "inv-1001": {
        id: "inv-1001",
        invoiceNo: "KH-021",
        customerName: "MS MADINA ENTERPRISE & LACQUER CENTER",
        customerPhone: "+8801711002233",
        customerAddress: "House 12, Sonadanga, Khulna",
        invoiceDate: "2026-01-22",
        status: "Due",
        subtotal: 280000,
        vat: 25200,
        discount: 3800,
        totalAmount: 301400,
        receiveAmount: 0,
        dueAmount: 301400,
        items: [
            {
                id: "item-1",
                name: "Acrylic Paint",
                quantity: 12,
                unit: "Drum",
                rate: 15000,
                amount: 180000,
            },
            {
                id: "item-2",
                name: "Primer",
                quantity: 8,
                unit: "Drum",
                rate: 12500,
                amount: 100000,
            },
        ],
    },
    "inv-1002": {
        id: "inv-1002",
        invoiceNo: "KH-022",
        customerName: "Sadar Paint House",
        customerPhone: "+8801912556611",
        customerAddress: "Boyra, Khulna",
        invoiceDate: "2026-02-01",
        status: "Partial",
        subtotal: 92000,
        vat: 8280,
        discount: 0,
        totalAmount: 100280,
        receiveAmount: 79880,
        dueAmount: 20400,
        items: [
            {
                id: "item-1",
                name: "Wall Putty",
                quantity: 5,
                unit: "Bag",
                rate: 8000,
                amount: 40000,
            },
            {
                id: "item-2",
                name: "Enamel Thinner",
                quantity: 4,
                unit: "Ltr",
                rate: 13000,
                amount: 52000,
            },
        ],
    },
    "inv-1003": {
        id: "inv-1003",
        invoiceNo: "KH-023",
        customerName: "Bestova Traders",
        customerPhone: "+8801888007788",
        customerAddress: "Khalishpur, Khulna",
        invoiceDate: "2026-02-08",
        status: "Paid",
        subtotal: 75000,
        vat: 6750,
        discount: 3450,
        totalAmount: 78300,
        receiveAmount: 78300,
        dueAmount: 0,
        items: [
            {
                id: "item-1",
                name: "Sealant",
                quantity: 2,
                unit: "Box",
                rate: 25000,
                amount: 50000,
            },
            {
                id: "item-2",
                name: "Brush Set",
                quantity: 25,
                unit: "Pc",
                rate: 1000,
                amount: 25000,
            },
        ],
    },
};

const InvoiceDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const invoice = invoices[id];

    if (!invoice) {
        notFound();
    }

    return (
        <div className="bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)]">
            <section className="mb-17">
                <Navbar1 className="scale-110 border-b fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur" />
            </section>
            <InvoiceDetailsPage invoice={invoice} />
        </div>
    );
};

export default InvoiceDetails;