import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supportedLanguages } from "@/lib/supported-languages";
import {
	CompilerLanguage,
	SubmissionOutput,
	SupportedLanguage,
} from "@/lib/types";

type CodeDrafts = Partial<Record<SupportedLanguage, string>>;

type CodeExecutionState = {
	codeByLanguage: CodeDrafts;
	stdIn: string;
	output: SubmissionOutput | null;
	isSubmitting: boolean;
};

type CodeExecutionActions = {
	setCode: (
		language: CompilerLanguage,
		code: string | ((prev: string) => string),
	) => void;
	setStdIn: (stdIn: string) => void;
	setOutput: (output: SubmissionOutput | null) => void;
	setIsSubmitting: (isSubmitting: boolean) => void;
	ensureLanguageDraft: (language: CompilerLanguage) => void;
	resetCodeToBoilerplate: (language: CompilerLanguage) => void;
};

function getBoilerplate(language: SupportedLanguage) {
	return supportedLanguages[language]?.boilerplate ?? "";
}

const useCodeExecutionStore = create<
	CodeExecutionState & { actions: CodeExecutionActions }
>()(
	persist(
		(set) => ({
			codeByLanguage: {},
			stdIn: "",
			output: null,
			isSubmitting: false,
			actions: {
				setCode: (language, code) =>
					set((state) => {
						const previousCode =
							state.codeByLanguage[language] ??
							getBoilerplate(language);

						return {
							codeByLanguage: {
								...state.codeByLanguage,
								[language]:
									typeof code === "function"
										? code(previousCode)
										: code,
							},
						};
					}),
				setStdIn: (stdIn) => set({ stdIn }),
				setOutput: (output) => set({ output }),
				setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
				ensureLanguageDraft: (language) =>
					set((state) => {
						if (state.codeByLanguage[language] !== undefined) {
							return state;
						}

						return {
							codeByLanguage: {
								...state.codeByLanguage,
								[language]: getBoilerplate(language),
							},
						};
					}),
				resetCodeToBoilerplate: (language) =>
					set((state) => ({
						codeByLanguage: {
							...state.codeByLanguage,
							[language]: getBoilerplate(language),
						},
					})),
			},
		}),
		{
			name: "tancode-code-execution",
			partialize: (state) => ({
				codeByLanguage: state.codeByLanguage,
			}),
			merge: (persistedState, currentState) => ({
				...currentState,
				...(persistedState as Partial<CodeExecutionState>),
			}),
		},
	),
);

export const useCodeExecutionCode = (language: CompilerLanguage) =>
	useCodeExecutionStore(
		(state) => state.codeByLanguage[language] ?? getBoilerplate(language),
	);
export const useCodeExecutionStdIn = () =>
	useCodeExecutionStore((state) => state.stdIn);
export const useCodeExecutionOutput = () =>
	useCodeExecutionStore((state) => state.output);
export const useCodeExecutionIsSubmitting = () =>
	useCodeExecutionStore((state) => state.isSubmitting);
export const useCodeExecutionActions = () =>
	useCodeExecutionStore((state) => state.actions);
