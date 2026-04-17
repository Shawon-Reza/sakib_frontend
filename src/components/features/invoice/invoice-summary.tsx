import { InvoiceSummary } from "./types";
import { currency } from "./utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InvoiceSummaryCardProps = {
  billNo: string;
  invoiceDate: string;
  summary: InvoiceSummary;
  receiveAmount: string;
  onReceiveAmountChange: (value: string) => void;
};

export function InvoiceSummaryCard({
  billNo,
  invoiceDate,
  summary,
  receiveAmount,
  onReceiveAmountChange,
}: InvoiceSummaryCardProps) {
  return (
    <div className="rounded-xl border p-3 sm:p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Bill Summary</h3>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-base">
          <dt className="font-semibold text-slate-900">Total</dt>
          <dd className="font-bold text-slate-900">{currency(summary.totalAmount)}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3 rounded-lg border bg-slate-50 p-3 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="space-y-1.5 w-full">
          <Label htmlFor="receive-amount">Receive Amount</Label>
          <Input
            id="receive-amount"
            type="number"
            min="0"
            value={receiveAmount}
            onChange={(e) => onReceiveAmountChange(e.target.value)}
          />
        </div>
        <div className="space-y-1.5 w-full">
          <Label htmlFor="due-amount">Due</Label>
          <Input id="due-amount" value={currency(summary.dueAmount)} readOnly />
        </div>
      </div>

      
    </div>
  );
}
