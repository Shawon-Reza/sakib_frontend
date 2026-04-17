"use client";

import { useState } from "react";

import { InvoiceListItem } from "@/components/features/invoice/invoice-management-types";

import { EditCustomerModal } from "../management/edit-customer-modal";
import { UserListItem } from "../user-management-types";
import { UserInvoicesSection } from "./user-invoices-section";
import { UserProfileHeader } from "./user-profile-header";
import { UserStats } from "./user-stats";

type UserDetailsPageProps = {
  user: UserListItem;
  invoices: InvoiceListItem[];
};

export function UserDetailsPage({ user, invoices }: UserDetailsPageProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    console.log("Delete user:", user.id);
  };

  return (
    <>
      <main className="container mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-5 sm:py-6">
        <UserProfileHeader
          user={user}
          onEdit={() => setIsEditOpen(true)}
          onDelete={handleDelete}
        />

        <UserStats user={user} />

        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">See all Invoices history</h2>
          <UserInvoicesSection invoices={invoices} userId={user.id} />
        </div>
      </main>

      <EditCustomerModal
        open={isEditOpen}
        user={user}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}
