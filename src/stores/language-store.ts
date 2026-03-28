import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supportedLanguages } from "@/lib/supported-languages";
import { AppLanguage, SupportedLanguage } from "@/lib/types";

type LanguageState = {
	language: AppLanguage;
};

type LanguageActions = {
	setLanguage: (language: AppLanguage) => void;
	getBoilerplateCode: (lang: SupportedLanguage) => string;
};

// Store is not exported to prevent direct subscription
const useLanguageStore = create<LanguageState & { actions: LanguageActions }>()(
	persist(
		(set, _) => ({
			language: "cpp17",
			actions: {
				setLanguage: (language) => {
					set({ language });
					// Note: Cross-store communication should be handled by the component
					// or via an event bus pattern, not directly in the store
				},
				getBoilerplateCode: (lang) =>
					supportedLanguages[lang]?.boilerplate ?? "",
			},
		}),
		{
			name: "next-pen-language",
		},
	),
);

// Atomic selectors - export only these
export const useLanguage = () => useLanguageStore((state) => state.language);
export const useLanguageActions = () =>
	useLanguageStore((state) => state.actions);
