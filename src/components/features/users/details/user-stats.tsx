"use client";

import { TrendingUp, FileText, DollarSign } from "lucide-react";
import { UserListItem } from "../user-management-types";

type UserStatsProps = {
  user: UserListItem;
};

export function UserStats({ user }: UserStatsProps) {
  const stats = [
    {
      label: "Total Invoices",
      value: user.totalInvoices.toString(),
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Spent",
      value: `৳${user.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Avg Invoice Value",
      value: user.totalInvoices > 0 
        ? `৳${Math.round(user.totalSpent / user.totalInvoices).toLocaleString()}`
        : "৳0",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.label}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`rounded-xl bg-linear-to-br ${stat.color} p-3 text-white`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
