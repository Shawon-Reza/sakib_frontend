
import Link from "next/link";

import { Button } from "@/components/ui/button";

const CreateInvoiceButton = () => {
    return (
        <button  className="bg-white px-3 py-2 rounded-lg text-slate-900  font-semibold hover:bg-gray-100 transition cursor-pointer">
            <Link href="/create-invoice" >Create Invoice</Link>
        </button>
    );
};

export default CreateInvoiceButton;