import { create } from "zustand";
import { supportedLanguages } from "@/lib/supported-languages";
import { SubmissionOutput } from "@/lib/types";

type CodeExecutionState = {
	code: string;
	stdIn: string;
	output: SubmissionOutput | null;
	isSubmitting: boolean;
	setCode: (code: string | ((prev: string) => string)) => void;
	setStdIn: (stdIn: string) => void;
	setOutput: (output: SubmissionOutput | null) => void;
	setIsSubmitting: (isSubmitting: boolean) => void;
	resetCodeToBoilerplate: (language: string) => void;
};

export const useCodeExecutionStore = create<CodeExecutionState>((set) => ({
	code: supportedLanguages["cpp17"].boilerplate,
	stdIn: "",
	output: null,
	isSubmitting: false,

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
}));
