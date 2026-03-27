import {
	compilerLanguages,
	editorOnlyLanguages,
	supportedLanguages,
} from "./supported-languages";

export type SubmissionOutput = {
	output: string;
	isExecutionSuccess: boolean;
};

export type CompilerLanguage = keyof typeof compilerLanguages;
export type EditorOnlyLanguage = keyof typeof editorOnlyLanguages;
export type SupportedLanguage = keyof typeof supportedLanguages;
