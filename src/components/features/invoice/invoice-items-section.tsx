import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { InvoiceItem } from "./types";
import { currency, toNumber } from "./utils";

type InvoiceItemsSectionProps = {
  items: InvoiceItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (
    id: string,
    key: keyof Omit<InvoiceItem, "id">,
    value: string
  ) => void;
};

export function InvoiceItemsSection({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: InvoiceItemsSectionProps) {
  return (
    <section className="rounded-xl border relative mb-12">
      <div className="flex items-center justify-between border-b px-3 py-3 sm:px-4">
        <h2 className="text-sm font-semibold text-slate-900">Items</h2>

      </div>

      <div className="space-y-3 p-3 sm:hidden">
        {items.map((item, index) => {
          const amount = toNumber(item.quantity) * toNumber(item.rate);

          return (
            <article key={item.id} className="rounded-lg border bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Item {index + 1}
                </p>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => onRemoveItem(item.id)}
                  disabled={items.length === 1}
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4 text-red-600" />
                </Button>
              </div>

              <div className="space-y-2">
                <Input
                  value={item.name}
                  placeholder="Product name"
                  onChange={(e) => onUpdateItem(item.id, "name", e.target.value)}
                />

                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={item.quantity}
                    placeholder="Qty"
                    onChange={(e) =>
                      onUpdateItem(item.id, "quantity", e.target.value)
                    }
                  />
                  <Input
                    value={item.unit}
                    placeholder="Unit"
                    onChange={(e) => onUpdateItem(item.id, "unit", e.target.value)}
                  />
                  <Input
                    type="number"
                    min="0"
                    value={item.rate}
                    placeholder="Rate"
                    onChange={(e) => onUpdateItem(item.id, "rate", e.target.value)}
                  />
                </div>

                <p className="text-right text-sm font-semibold text-slate-800">
                  Amount: {currency(amount)}
                </p>
              </div>
            </article>
          );
        })}
      </div>


      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-180 text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="w-14 px-3 py-2">S.N.</th>
              <th className="px-3 py-2">Item Name</th>
              <th className="w-28 px-3 py-2">Qty</th>
              <th className="w-24 px-3 py-2">Unit</th>
              <th className="w-32 px-3 py-2">Rate</th>
              <th className="w-36 px-3 py-2 text-right">Amount</th>
              <th className="w-16 px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const amount = toNumber(item.quantity) * toNumber(item.rate);

              return (
                <tr key={item.id} className="border-t align-top">
                  <td className="px-3 py-2.5">{index + 1}</td>
                  <td className="px-3 py-2.5">
                    <Input
                      value={item.name}
                      placeholder="Product name"
                      onChange={(e) => onUpdateItem(item.id, "name", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateItem(item.id, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input
                      value={item.unit}
                      onChange={(e) => onUpdateItem(item.id, "unit", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => onUpdateItem(item.id, "rate", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2.5 text-right font-medium text-slate-800">
                    {currency(amount)}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={items.length === 1}
                      aria-label="Remove item"
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Button
        className="absolute right-0 -bottom-10 cursor-pointer"
        type="button" size="sm" onClick={onAddItem}>
        <Plus className="size-4" />
        Add Product
      </Button>
    </section>
  );
}
