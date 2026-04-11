"use client";

import { useEffect, useState } from "react";

type LanguageOption = {
    value: string;
    label: string;
};

const LANGUAGES: LanguageOption[] = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "pt", label: "Portuguese" },
    { value: "de", label: "German" },
    { value: "bn", label: "Bengali" },
    { value: "zh-CN", label: "Chinese (Simplified)" },
    { value: "zh-TW", label: "Chinese (Traditional)" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "ru", label: "Russian" },
    { value: "it", label: "Italian" },
    { value: "ar", label: "Arabic" },
];

export default function LanguageSwitcher() {
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
        const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
        if (match?.[1]) {
            setSelectedLanguage(match[1]);
        }
    }, []);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nextLanguage = event.target.value;
        setSelectedLanguage(nextLanguage);

        const cookieValue = `/auto/${nextLanguage}`;
        document.cookie = `googtrans=${cookieValue};path=/`;
        document.cookie = `googtrans=${cookieValue};path=/;domain=${window.location.hostname}`;

        window.location.assign(`${window.location.pathname}${window.location.search}`);
    };

    return (
        <div className="notranslate flex items-center gap-2" translate="no">
            <label
                htmlFor="language-switcher"
                className="text-xs font-semibold text-zinc-900"
            >
                Language
            </label>

            <select
                id="language-switcher"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="rounded-md border border-zinc-600 bg-zinc-90 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-300"
            >
                {LANGUAGES.map((language) => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </select>

            <div
                id="google_translate_element"
                className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
            />
        </div>
    );
}