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

const useLanguageStore = create<LanguageState & { actions: LanguageActions }>()(
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
		},
	),
);

export const useLanguage = () => useLanguageStore((state) => state.language);
export const useLanguageActions = () =>
	useLanguageStore((state) => state.actions);
