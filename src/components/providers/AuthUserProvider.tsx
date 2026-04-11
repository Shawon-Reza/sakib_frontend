"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  emailVerified?: boolean;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type AuthUserContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (nextUser: AuthUser | null) => void;
};

const AuthUserContext = createContext<AuthUserContextValue | undefined>(undefined);

type AuthUserProviderProps = {
  initialUser: AuthUser | null;
  children: React.ReactNode;
};

export function AuthUserProvider({ initialUser, children }: AuthUserProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      setUser,
    }),
    [user]
  );

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>;
}

export function useAuthUser() {
  const context = useContext(AuthUserContext);

  if (!context) {
    throw new Error("useAuthUser must be used inside AuthUserProvider");
  }

  return context;
}
