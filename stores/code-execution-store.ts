import { create } from "zustand";
import { supportedLanguages } from "@/lib/supported-languages";
import { SubmissionOutput } from "@/lib/types";

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
	resetCodeToBoilerplate: (language: string) => void;
};

// Store is not exported to prevent direct subscription
const useCodeExecutionStore = create<
	CodeExecutionState & { actions: CodeExecutionActions }
>()((set) => ({
	code: supportedLanguages["cpp17"].boilerplate,
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
		resetCodeToBoilerplate: (language: string) => {
			const boilerplate =
				(supportedLanguages[language as keyof typeof supportedLanguages]
					?.boilerplate as string) || "";
			set({ code: boilerplate });
		},
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
