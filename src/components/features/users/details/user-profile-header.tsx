"use client";

import { UserListItem, UserAccountStatus } from "../user-management-types";
import { Mail, Phone, Shield, Calendar, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";

type UserProfileHeaderProps = {
  user: UserListItem;
  onEdit?: () => void;
  onDelete?: () => void;
};

const statusStyles: Record<UserAccountStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Invited: "bg-amber-50 text-amber-700 ring-amber-200",
  Suspended: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusColors: Record<UserAccountStatus, string> = {
  Active: "bg-emerald-500",
  Invited: "bg-amber-500",
  Suspended: "bg-rose-500",
};

export function UserProfileHeader({ user, onEdit, onDelete }: UserProfileHeaderProps) {
  const initials = user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header Background */}
      <div className="h-32 bg-linear-to-r from-slate-900 via-slate-800 to-slate-700" />

      {/* Profile Content */}
      <div className="px-4 py-6 sm:px-6 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          {/* Avatar and Info */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative -mt-16">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-linear-to-br from-blue-400 to-blue-600 text-2xl font-bold text-white shadow-lg">
                {initials}
              </div>
              <div
                className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-white ${statusColors[user.status]}`}
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{user.fullName}</h1>
              <p className="mt-1 text-sm text-slate-600">{user.userCode}</p>

              {/* Status Badge */}
              <div className="mt-3">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[user.status]}`}>
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-current" />
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            {onEdit && (
              <Button variant="outline" onClick={onEdit} className="flex-1 sm:flex-none">
                Edit Profile
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" onClick={onDelete} className="flex-1 sm:flex-none">
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-600">Email</span>
            </div>
            <p className="mt-2 truncate text-sm font-medium text-slate-900">{user.email}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-600">Phone</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-900">{user.phone}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-600">Role</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-900">{user.role}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-600">Joined</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-900">{user.joinedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
