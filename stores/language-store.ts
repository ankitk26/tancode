import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supportedLanguages } from "@/lib/supported-languages";
import { useCodeExecutionStore } from "./code-execution-store";

type LanguageState = {
	language: string;
	setLanguage: (language: string) => void;
	getBoilerplateCode: (lang: string) => string;
};

export const useLanguageStore = create<LanguageState>()(
	persist(
		(set) => ({
			language: "cpp17",
			setLanguage: (language) => {
				set({ language });
				// Reset code to boilerplate when language changes
				useCodeExecutionStore
					.getState()
					.resetCodeToBoilerplate(language);
			},
			getBoilerplateCode: (lang: string) => {
				return (
					(supportedLanguages[lang as keyof typeof supportedLanguages]
						?.boilerplate as string) || ""
				);
			},
		}),
		{
			name: "next-pen-language",
		},
	),
);
