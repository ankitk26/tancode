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

// Get initial code based on persisted language
const getInitialCode = () => {
	if (typeof window === "undefined")
		return supportedLanguages["cpp17"].boilerplate;
	const persistedLanguage = localStorage.getItem("next-pen-language");
	if (persistedLanguage) {
		try {
			const parsed = JSON.parse(persistedLanguage);
			const lang = parsed?.state?.language;
			if (
				lang &&
				supportedLanguages[lang as keyof typeof supportedLanguages]
			) {
				return supportedLanguages[
					lang as keyof typeof supportedLanguages
				].boilerplate;
			}
		} catch {
			// Ignore parse errors
		}
	}
	return supportedLanguages["cpp17"].boilerplate;
};

// Store is not exported to prevent direct subscription
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

// Atomic selectors - export only these
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
