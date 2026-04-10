import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InvoiceDueDetailsProps = {
  referenceInvoiceNos: string[];
  previousDue: string;
  receivedAmount: string;
  onAddReferenceInvoice: () => void;
  onRemoveReferenceInvoice: (index: number) => void;
  onReferenceInvoiceChange: (index: number, value: string) => void;
  onPreviousDueChange: (value: string) => void;
  onReceivedAmountChange: (value: string) => void;
};

export function InvoiceDueDetails({
  referenceInvoiceNos,
  previousDue,
  receivedAmount,
  onAddReferenceInvoice,
  onRemoveReferenceInvoice,
  onReferenceInvoiceChange,
  onPreviousDueChange,
  onReceivedAmountChange,
}: InvoiceDueDetailsProps) {
  return (
    <div className="space-y-3 rounded-xl border p-3 sm:p-4">
      <h3 className="text-sm font-semibold text-slate-900">Due Details</h3>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <Label>Reference Invoice No</Label>
          <Button
            type="button"
            size="xs"
            variant="outline"
            onClick={onAddReferenceInvoice}
          >
            <Plus className="size-3" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {referenceInvoiceNos.map((invoiceNo, index) => (
            <div key={`ref-invoice-${index}`} className="flex gap-2">
              <Input
                id={`reference-invoice-${index}`}
                placeholder={`Example: INV-${109 + index}`}
                value={invoiceNo}
                onChange={(e) => onReferenceInvoiceChange(index, e.target.value)}
              />
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                onClick={() => onRemoveReferenceInvoice(index)}
                disabled={referenceInvoiceNos.length === 1}
                aria-label="Remove reference invoice"
              >
                <Trash2 className="size-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="previous-due">Previous Due</Label>
        <Input
          id="previous-due"
          type="number"
          min="0"
          value={previousDue}
          onChange={(e) => onPreviousDueChange(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="received-amount">Received Amount</Label>
        <Input
          id="received-amount"
          type="number"
          min="0"
          value={receivedAmount}
          onChange={(e) => onReceivedAmountChange(e.target.value)}
        />
      </div>
    </div>
  );
}
