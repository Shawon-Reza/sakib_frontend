import { baseUrl } from "@/config/config";
import { cookies } from "next/headers";
import type { AuthUser } from "@/components/providers/AuthUserProvider";

type IsMeResponse = {
    user?: AuthUser;
};

const isMe = {
    getCurrentUser: async (): Promise<AuthUser | null> => {
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
    },
};

export default isMe
