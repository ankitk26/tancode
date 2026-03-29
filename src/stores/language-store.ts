import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supportedLanguages } from "@/lib/supported-languages";
import { AppLanguage, SupportedLanguage } from "@/lib/types";

type LanguageState = {
	language: AppLanguage;
	actions: {
		setLanguage: (language: AppLanguage) => void;
		getBoilerplateCode: (lang: SupportedLanguage) => string;
	};
};

const useLanguageStore = create<LanguageState>()(
	persist(
		(set) => ({
			language: "cpp17",
			actions: {
				setLanguage: (language) => set({ language }),
				getBoilerplateCode: (lang) =>
					supportedLanguages[lang]?.boilerplate ?? "",
			},
		}),
		{
			name: "next-pen-language",
			partialize: (state) => ({ language: state.language }),
		},
	),
);

export const useLanguage = () => useLanguageStore((state) => state.language);
export const useLanguageActions = () =>
	useLanguageStore((state) => state.actions);
