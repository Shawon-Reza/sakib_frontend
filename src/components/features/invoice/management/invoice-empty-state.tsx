export function InvoiceEmptyState() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">No Invoices Found</h2>
      <p className="mt-2 text-sm text-slate-600">Backend returned an empty list.</p>
    </section>
  );
}
