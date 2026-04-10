import { LayoutGrid, Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserFiltersBar() {
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <SlidersHorizontal className="size-4 text-slate-500" />
          Filter Options
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          <LayoutGrid className="size-3" />
          UI Only
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2 xl:col-span-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by name, email, phone, or code"
              className="h-10 rounded-xl border-slate-300/80 bg-white pl-10"
            />
          </div>
        </div>

        <Select>
          <SelectTrigger className="h-10 w-full rounded-xl border-slate-300/80 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="invited">Invited</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-10 w-full rounded-xl border-slate-300/80 bg-white">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
