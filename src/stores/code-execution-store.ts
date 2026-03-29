import { create } from "zustand";
import { supportedLanguages } from "@/lib/supported-languages";
import { SubmissionOutput, SupportedLanguage } from "@/lib/types";

type CodeExecutionState = {
	code: string;
	stdIn: string;
	output: SubmissionOutput | null;
	isSubmitting: boolean;
};

type CodeExecutionActions = {
	setCode: (code: string | ((prev: string) => string)) => void;
	setStdIn: (stdIn: string) => void;
	setOutput: (output: SubmissionOutput | null) => void;
	setIsSubmitting: (isSubmitting: boolean) => void;
	resetCodeToBoilerplate: (language: SupportedLanguage) => void;
};

function isSupportedLanguage(language: unknown): language is SupportedLanguage {
	return typeof language === "string" && language in supportedLanguages;
}

const getInitialCode = () => {
	if (typeof window === "undefined")
		return supportedLanguages["cpp17"].boilerplate;

	const persistedLanguage = localStorage.getItem("next-pen-language");

	if (!persistedLanguage) {
		return supportedLanguages["cpp17"].boilerplate;
	}

	try {
		const parsed = JSON.parse(persistedLanguage);
		const language = parsed?.state?.language;

		// Ignore persisted values like "webd" and fall back to a runnable language.
		if (isSupportedLanguage(language)) {
			return supportedLanguages[language].boilerplate;
		}
	} catch {
		// Ignore malformed localStorage state and keep the default boilerplate.
	}

	return supportedLanguages["cpp17"].boilerplate;
};

const useCodeExecutionStore = create<
	CodeExecutionState & { actions: CodeExecutionActions }
>()((set) => ({
	code: getInitialCode(),
	stdIn: "",
	output: null,
	isSubmitting: false,
	actions: {
		setCode: (code) =>
			set((state) => ({
				code: typeof code === "function" ? code(state.code) : code,
			})),
		setStdIn: (stdIn) => set({ stdIn }),
		setOutput: (output) => set({ output }),
		setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
		resetCodeToBoilerplate: (language) =>
			set({ code: supportedLanguages[language]?.boilerplate ?? "" }),
	},
}));

export const useCodeExecutionCode = () =>
	useCodeExecutionStore((state) => state.code);
export const useCodeExecutionStdIn = () =>
	useCodeExecutionStore((state) => state.stdIn);
export const useCodeExecutionOutput = () =>
	useCodeExecutionStore((state) => state.output);
export const useCodeExecutionIsSubmitting = () =>
	useCodeExecutionStore((state) => state.isSubmitting);
export const useCodeExecutionActions = () =>
	useCodeExecutionStore((state) => state.actions);
