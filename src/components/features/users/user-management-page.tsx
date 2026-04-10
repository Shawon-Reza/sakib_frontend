"use client";

import { UserListItem } from "./user-management-types";
import {
  UserEmptyState,
  UserFiltersBar,
  UserListCard,
  UserManagementHeader,
} from "./management";

type UserManagementPageProps = {
  users: UserListItem[];
};

export function UserManagementPage({ users }: UserManagementPageProps) {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)] px-3 py-4 sm:px-5 sm:py-6">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-44 h-56 w-56 rounded-full bg-emerald-200/25 blur-3xl" />

      <section className="container mx-auto w-full space-y-3">
        <UserManagementHeader users={users} />

        <UserFiltersBar />

        {users.length === 0 ? (
          <UserEmptyState />
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {users.map((user) => (
              <UserListCard key={user.id} user={user} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
