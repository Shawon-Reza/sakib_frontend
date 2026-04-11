"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosApi from "@/config/axiosInstance";

interface Login1Props {
    heading?: string;
    description?: string;
    logo: {
        url: string;
        src: string;
        alt: string;
        title?: string;
    };
    buttonText?: string;
    signupText?: string;
    signupUrl?: string;
    className?: string;
}

const Login1 = ({
    heading = "Welcome back",
    description = "Sign in to continue to your dashboard.",
    logo = {
        url: "/",
        src: "/logo.png",
        alt: "logo",
        title: "My Website",
    },
    buttonText = "Sign In",
    signupText = "Don't have an account?",
    signupUrl = "/sign-up",
    className,
}: Login1Props) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const updateField = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Login form data:", form);
        signInMutation.mutate({
            email: form.email,
            password: form.password,
            rememberMe: form.rememberMe,
        });
    };

    const signInMutation = useMutation({
        mutationFn: async (payload: { email: string; password: string; rememberMe: boolean }) => {
            const response = await axiosApi.post("/api/auth/sign-in/email", payload);
            console.log(response.data)
            return response.data;

        },
        onSuccess: (data) => {
            console.log("Login Success:", data)
            toast.success("Login successful!", {
                position: "top-center",
            });
            router.push("/home");
        },
        onError: (error) => {
            console.log("Login error:", error);
            console.log("Login error:", error.message);
            console.log("Login error:", signInMutation.error);

            toast.error(`Login failed. ${error.message}`, {
                position: "top-center",
            });
        }
    })



    return (
        <section className={cn("min-h-screen bg-muted px-4 py-6 sm:px-6 lg:px-8", className)}>
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl border border-muted bg-background shadow-xl lg:grid-cols-2">
                    <div className="flex flex-col justify-between bg-[linear-gradient(to_bottom,#0f172a,#1e293b)] p-6 text-white sm:p-8 lg:p-10">
                        <div className="flex items-center gap-3">
                            <a href={logo.url} className="inline-flex items-center gap-2">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    className="h-10 w-auto rounded-md bg-white/10 p-1 dark:invert"
                                />
                            </a>
                        </div>

                        <div className="mt-10 space-y-4 lg:mt-0">
                            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
                                Secure access
                            </p>
                            <h1 className="max-w-md text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
                                Fast, clean login for mobile and desktop.
                            </h1>
                            <p className="max-w-md text-sm text-slate-300 sm:text-base">
                                This sign-in page is responsive, simple to use on phones, and logs submitted data to the console.
                            </p>
                        </div>

                        <div className="mt-10 hidden gap-3 text-sm text-slate-300 sm:flex">
                            <span className="rounded-full border border-white/15 px-3 py-1">Mobile friendly</span>
                            <span className="rounded-full border border-white/15 px-3 py-1">Console logging</span>
                            <span className="rounded-full border border-white/15 px-3 py-1">Responsive UI</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                            <div className="space-y-2 text-center lg:text-left">
                                {heading && <h2 className="text-2xl font-semibold sm:text-3xl">{heading}</h2>}
                                <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    className="h-12 text-sm"
                                    value={form.email}
                                    onChange={(event) => updateField("email", event.target.value)}
                                    required
                                />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-12 text-sm"
                                    value={form.password}
                                    onChange={(event) => updateField("password", event.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-sm text-muted-foreground hover:underline"
                                >
                                    {showPassword ? "Hide" : "Show"} Password
                                </button>
                            </div>

                            <div className="sm:flex items-center justify-between gap-3 text-sm">
                                <label className="flex items-center gap-2 text-muted-foreground">
                                    <input
                                        type="checkbox"
                                        checked={form.rememberMe}
                                        onChange={(event) => updateField("rememberMe", event.target.checked)}
                                        className="size-4 rounded border-border"
                                    />
                                    Remember me
                                </label>
                                <div className="flex justify-center">
                                    <a href="#" className="font-medium text-red-500 underline hover:underline text-center mt-2 sm:mt-0">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button type="submit" className="h-12 -mt-5 sm:mt-0 w-full text-sm sm:text-base">
                                {buttonText}
                            </Button>

                            <div className="flex flex-wrap items-center justify-center gap-1 text-center text-sm text-muted-foreground">
                                <p>{signupText}</p>
                                <a href={signupUrl} className="font-medium text-primary hover:underline">
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Login1 };
