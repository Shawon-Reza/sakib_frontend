"use server";

import { cookies } from "next/headers";

import { AuthUser } from "@/components/providers/AuthUserProvider";
import { baseUrl } from "@/config/config";

type IsMeResponse = {
    user?: AuthUser;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
    try {
        const cookieStore = await cookies();

        const response = await fetch(`${baseUrl}/api/isme`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as IsMeResponse;
        return data.user ?? null;
    } catch {
        return null;
    }
}