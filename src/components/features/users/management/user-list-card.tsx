import Link from "next/link";
import { BadgeCheck, CalendarDays, Mail, Phone, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UserAccountStatus, UserListItem } from "../user-management-types";

type UserListCardProps = {
  user: UserListItem;
};

const statusStyles: Record<UserAccountStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Invited: "bg-amber-50 text-amber-700 ring-amber-200",
  Suspended: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusAccent: Record<UserAccountStatus, string> = {
  Active: "from-emerald-400/20 to-emerald-100/5",
  Invited: "from-amber-400/20 to-amber-100/5",
  Suspended: "from-rose-400/20 to-rose-100/5",
};

export function UserListCard({ user }: UserListCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${statusAccent[user.status]}`} />

      <div className="border-b border-slate-200 bg-slate-50/80 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              User Code
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              {user.userCode}
            </h2>
          </div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[user.status]}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2 text-sm text-slate-700">
          <p className="truncate text-base font-semibold text-slate-900">{user.fullName}</p>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-slate-500" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 text-slate-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-slate-500" />
            <span>{user.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-slate-500" />
            <span>{user.joinedDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div>
            <p className="text-xs text-slate-500">Total Invoices</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{user.totalInvoices}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Spent</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{user.totalSpent.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button asChild variant="outline" size="sm">
            <Link href={`/users/${user.id}`}>View</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/users/${user.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
