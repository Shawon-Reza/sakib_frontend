"use client";

import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/config/config";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface Signup2Props {
    heading?: string;
    description?: string;
    logo: {
        url: string;
        src: string;
        alt: string;
        title?: string;
    };
    buttonText?: string;
    loginText?: string;
    loginUrl?: string;
    className?: string;
}

type SignupRequestBody = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "ADMIN";
    callbackURL: string;
};

const Signup2 = ({
    heading = "Create your account",
    description = "Join now and start managing your dashboard in minutes.",
    logo,
    buttonText = "Create Account",
    loginText = "Already have an account?",
    loginUrl = "/sign-in",
    className,
}: Signup2Props) => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const signUpMutation = useMutation({
        mutationFn: async (payload: SignupRequestBody) => {
            const response = await axios.post(`${baseUrl}/api/auth/sign-up/email`, payload);
            return response.data;
        },
        onSuccess: (data, variables) => {
            toast.success("Signup successful! You can now log in.", {
                position: "top-center",
            });
            console.log("Signup request payload:", variables);
            console.log("Signup success response:", data);
            redirect("/sign-in");

        },
        onError: (error, variables) => {
            console.log("Signup request payload:", variables);
            console.log("Signup error:", error);

            if (axios.isAxiosError(error)) {
                console.log("Signup error response data:", error.response?.data);
                toast.error(error.response?.data?.message || "Signup failed. Please try again.", {
                    position: "top-center",
                });
                console.log("Signup error status:", error.response?.status);
            }
        },
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.password !== form.confirmPassword) {
            console.log("Signup validation error:", {
                message: "Password and confirm password do not match.",
                form,
            });
            toast.error("Password and confirm password do not match.", {
                position: "top-center",
            });
            return;
        }

        const payload: SignupRequestBody = {
            name: form.fullName,
            email: form.email,
            password: form.password,
            phone: form.phone || undefined,
            role: "ADMIN",
            callbackURL: `${window.location.origin}/sign-in`
        };

        await signUpMutation.mutateAsync(payload);
    };

    return (
        <section
            className={cn(
                "relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)] px-4 py-6 sm:px-6 lg:px-8",
                className
            )}
        >
            <div className="pointer-events-none absolute -left-16 top-14 h-56 w-56 rounded-full bg-emerald-200/35 blur-3xl sm:h-72 sm:w-72" />
            <div className="pointer-events-none absolute -right-16 top-40 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl sm:h-72 sm:w-72" />

            <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
                    <aside className="flex flex-col justify-between bg-[#11192c] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                        <div className="flex items-center gap-3">
                            <a href={logo.url} className="inline-flex items-center gap-3">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    className="h-11 w-auto rounded-2xl bg-white/10 p-1.5 shadow-sm dark:invert"
                                />
                                {logo.title ? (
                                    <span className="text-sm font-medium tracking-[0.2em] text-emerald-100 uppercase">
                                        {logo.title}
                                    </span>
                                ) : null}
                            </a>
                        </div>

                        <div className="my-10 space-y-5 sm:my-12 lg:my-0">
                            <span className="inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium tracking-[0.2em] text-emerald-100 uppercase">
                                New account
                            </span>
                            <div className="space-y-4">
                                <h1 className="max-w-xl text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                                    Fast signup experience built for mobile first.
                                </h1>
                                <p className="max-w-xl text-sm leading-6 text-emerald-100/90 sm:text-base">
                                    Clear fields, touch-friendly spacing, and responsive structure from phone to desktop.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                                <p className="text-xs uppercase tracking-[0.18em] text-emerald-100">Mobile</p>
                                <p className="mt-1 font-medium">Easy on small screens</p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                                <p className="text-xs uppercase tracking-[0.18em] text-emerald-100">Responsive</p>
                                <p className="mt-1 font-medium">Scales to all devices</p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                                <p className="text-xs uppercase tracking-[0.18em] text-emerald-100">Debug</p>
                                <p className="mt-1 font-medium">Console logging ready</p>
                            </div>
                        </div>
                    </aside>

                    <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
                            <div className="space-y-2 text-center lg:text-left">
                                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{heading}</h2>
                                <p className="text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2 sm:col-span-2">
                                    <label htmlFor="signup-fullname" className="text-sm font-medium text-slate-700">
                                        Full Name
                                    </label>
                                    <Input
                                        id="signup-fullname"
                                        placeholder="Enter your full name"
                                        className="h-12 rounded-xl border-slate-300 bg-white text-sm text-slate-900"
                                        value={form.fullName}
                                        onChange={(event) => updateField("fullName", event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <label htmlFor="signup-email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="h-12 rounded-xl border-slate-300 bg-white text-sm text-slate-900"
                                        value={form.email}
                                        onChange={(event) => updateField("email", event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <label htmlFor="signup-phone" className="text-sm font-medium text-slate-700">
                                        Phone
                                    </label>
                                    <Input
                                        id="signup-phone"
                                        placeholder="+8801XXXXXXXXX"
                                        className="h-12 rounded-xl border-slate-300 bg-white text-sm text-slate-900"
                                        value={form.phone}
                                        onChange={(event) => updateField("phone", event.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="signup-password" className="text-sm font-medium text-slate-700">
                                        Password
                                    </label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Create password"
                                        className="h-12 rounded-xl border-slate-300 bg-white text-sm text-slate-900"
                                        value={form.password}
                                        onChange={(event) => updateField("password", event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="signup-confirm-password" className="text-sm font-medium text-slate-700">
                                        Confirm Password
                                    </label>
                                    <Input
                                        id="signup-confirm-password"
                                        type="password"
                                        placeholder="Confirm password"
                                        className="h-12 rounded-xl border-slate-300 bg-white text-sm text-slate-900"
                                        value={form.confirmPassword}
                                        onChange={(event) => updateField("confirmPassword", event.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="h-12 w-full rounded-xl bg-[#11192c] text-sm text-white sm:text-base"
                                disabled={signUpMutation.isPending}
                            >
                                {buttonText}
                            </Button>

                            <div className="flex flex-wrap items-center justify-center gap-1 text-center text-sm text-slate-600">
                                <p>{loginText}</p>
                                <a href={loginUrl} className="font-medium text-slate-900 underline-offset-4 hover:underline">
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Signup2 };
