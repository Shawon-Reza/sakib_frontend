import { UserListItem } from "../user-management-types";
import CreateUserManagementButton from "./create-user-management-button";

type UserManagementHeaderProps = {
  users: UserListItem[];
};

export function UserManagementHeader({ users }: UserManagementHeaderProps) {
  const activeCount = users.filter((user) => user.status === "Active").length;
  const invitedCount = users.filter((user) => user.status === "Invited").length;

  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-800/20 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-4 text-white shadow-xl sm:p-4">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-slate-300">
            USER MANAGEMENT
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            All Users
          </h1>
        </div>
        <CreateUserManagementButton />
      </div>

      <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
        Showing user list from backend response as responsive cards.
      </p>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center sm:max-w-md sm:gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
          <p className="text-[11px] text-slate-300">Total</p>
          <p className="text-base font-semibold">{users.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
          <p className="text-[11px] text-slate-300">Active</p>
          <p className="text-base font-semibold">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
          <p className="text-[11px] text-slate-300">Invited</p>
          <p className="text-base font-semibold">{invitedCount}</p>
        </div>
      </div>
    </header>
  );
}
