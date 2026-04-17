export function InvoiceHeader() {
  return (
    <header className="border-b px-4 py-4 sm:px-6 bg-[#171717] text-white rounded-t-2xl text-center">
      <p className="text-xs font-medium tracking-[0.18em] ">
        INVOICE BUILDER
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight ">
        Create Invoice
      </h1>
      <p className="mt-1 text-sm opacity-70">
        Add products and the total will be generated automatically.
      </p>
    </header>
  );
}
