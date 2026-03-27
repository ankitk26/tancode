"use client";

import { SubmissionOutput } from "@/lib/types";
import { supportedLanguages } from "@/lib/supported-languages";
import { createContext, useContext, useState } from "react";

type AppState = {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
	fontFamily: string;
	setFontFamily: React.Dispatch<React.SetStateAction<string>>;
	fontSize: number;
	setFontSize: React.Dispatch<React.SetStateAction<number>>;
	wrap: boolean;
	setWrap: React.Dispatch<React.SetStateAction<boolean>>;
	showLineNumbers: boolean;
	setShowLineNumbers: React.Dispatch<React.SetStateAction<boolean>>;
	alignment: string;
	setAlignment: React.Dispatch<React.SetStateAction<string>>;
	language: string;
	setLanguage: React.Dispatch<React.SetStateAction<string>>;
	getBoilerplateCode: (lang: string) => string;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
	stdIn: string;
	setStdIn: React.Dispatch<React.SetStateAction<string>>;
	output: SubmissionOutput | null;
	setOutput: React.Dispatch<React.SetStateAction<SubmissionOutput | null>>;
	isSubmitting: boolean;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	headTags: string;
	setHeadTags: React.Dispatch<React.SetStateAction<string>>;
	cssFramework: string;
	setCssFramework: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState("one_dark");
	const [fontFamily, setFontFamily] = useState("JetBrains Mono");
	const [fontSize, setFontSize] = useState(14);
	const [wrap, setWrap] = useState(true);
	const [showLineNumbers, setShowLineNumbers] = useState(true);
	const [alignment, setAlignment] = useState("right");
	const [language, setLanguage] = useState("cpp17");

	const [code, setCode] = useState(
		supportedLanguages.cpp17.boilerplate as string,
	);
	const [stdIn, setStdIn] = useState("");
	const [output, setOutput] = useState<SubmissionOutput | null>(null);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [headTags, setHeadTags] = useState("");
	const [cssFramework, setCssFramework] = useState("none");

	const getBoilerplateCode = (lang: string) => {
		return supportedLanguages[lang as keyof typeof supportedLanguages]
			?.boilerplate as string;
	};

	return (
		<AppContext.Provider
			value={{
				theme,
				setTheme,
				fontFamily,
				setFontFamily,
				fontSize,
				setFontSize,
				wrap,
				setWrap,
				showLineNumbers,
				setShowLineNumbers,
				alignment,
				setAlignment,
				language,
				setLanguage,
				code,
				setCode,
				stdIn,
				setStdIn,
				output,
				setOutput,
				isSubmitting,
				setIsSubmitting,
				headTags,
				setHeadTags,
				cssFramework,
				setCssFramework,
				getBoilerplateCode,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useEditor = () => useContext(AppContext);
