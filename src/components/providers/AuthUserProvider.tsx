"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

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

type AuthContextValue = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    setUser: (nextUser: AuthUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthUserProviderProps = {
    children: ReactNode;
    initialUser: AuthUser | null;
};

const AuthUserProvider = ({ children, initialUser }: AuthUserProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(initialUser);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            setUser,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthUser = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthUser must be used within AuthUserProvider");
    }

    return context;
};

export default AuthUserProvider;