"use client";

import { UserListItem } from "../user-management-types";
import { InvoiceListItem } from "@/components/features/invoice/invoice-management-types";
import { UserProfileHeader } from "./user-profile-header";
import { UserStats } from "./user-stats";
import { UserInvoicesSection } from "./user-invoices-section";

type UserDetailsPageProps = {
  user: UserListItem;
  invoices: InvoiceListItem[];
};

export function UserDetailsPage({ user, invoices }: UserDetailsPageProps) {
  const handleEdit = () => {
    console.log("Edit user:", user.id);
  };

  const handleDelete = () => {
    console.log("Delete user:", user.id);
  };

  return (
    <main className="space-y-6 py-4 sm:px-5 sm:py-6 px-4 container mx-auto max-w-7xl">
      {/* User Profile Header */}
      <UserProfileHeader user={user} onEdit={handleEdit} onDelete={handleDelete} />

      {/* User Stats */}
      <UserStats user={user} />

      {/* Invoice History Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">See all Invoices history</h2>
        <UserInvoicesSection invoices={invoices} userId={user.id} />
      </div>
    </main>
  );
}
