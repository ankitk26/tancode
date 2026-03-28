import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supportedLanguages } from "@/lib/supported-languages";

type LanguageState = {
	language: string;
};

type LanguageActions = {
	setLanguage: (language: string) => void;
	getBoilerplateCode: (lang: string) => string;
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
				getBoilerplateCode: (lang: string) => {
					return (
						(supportedLanguages[
							lang as keyof typeof supportedLanguages
						]?.boilerplate as string) || ""
					);
				},
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
