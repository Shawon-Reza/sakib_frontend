"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CreateCustomerModal } from "./create-customer-modal";

const CreateUserManagementButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-white text-slate-900 hover:bg-slate-100"
            >
                Create Customer
            </Button>
            <CreateCustomerModal open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default CreateUserManagementButton;
