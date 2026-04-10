import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InvoiceCustomerSectionProps = {
  billNo: string;
  invoiceDate: string;
  customerName: string;
  customerAddress: string;
  onBillNoChange: (value: string) => void;
  onInvoiceDateChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
  onCustomerAddressChange: (value: string) => void;
};

export function InvoiceCustomerSection({
  billNo,
  invoiceDate,
  customerName,
  customerAddress,
  onBillNoChange,
  onInvoiceDateChange,
  onCustomerNameChange,
  onCustomerAddressChange,
}: InvoiceCustomerSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-1.5">
        <Label htmlFor="bill-no">Bill No</Label>
        <Input
          id="bill-no"
          value={billNo}
          onChange={(e) => onBillNoChange(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="invoice-date">Date</Label>
        <Input
          id="invoice-date"
          type="date"
          value={invoiceDate}
          onChange={(e) => onInvoiceDateChange(e.target.value)}
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="customer-name">Customer Name</Label>
        <Input
          id="customer-name"
          value={customerName}
          placeholder="Enter customer name"
          onChange={(e) => onCustomerNameChange(e.target.value)}
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2 lg:col-span-4">
        <Label htmlFor="customer-address">Address</Label>
        <Textarea
          id="customer-address"
          value={customerAddress}
          placeholder="Enter customer address"
          onChange={(e) => onCustomerAddressChange(e.target.value)}
        />
      </div>
    </section>
  );
}
