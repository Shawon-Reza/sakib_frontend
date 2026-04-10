import { InvoiceBuilder } from "@/components/features/invoice/invoice-builder";
import { Navbar1 } from "@/components/navbar1";
import { div } from "framer-motion/client";

export default function CreateInvoicePage() {
    return (
        <div className="pt-17">
            <Navbar1 className="scale-110 border-b  fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur " />

            <section className="mt-">
                <InvoiceBuilder />
            </section>


        </div>
    );
}