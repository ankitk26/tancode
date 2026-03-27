"use client";

import { SubmissionOutput } from "@/lib/types";
import { supportedLanguages } from "@/lib/supported-languages";
import { createContext, useContext, useState, useCallback } from "react";

type AppState = {
	theme: string;
	setTheme: (value: string) => void;
	fontFamily: string;
	setFontFamily: (value: string) => void;
	fontSize: number;
	setFontSize: (value: number) => void;
	wrap: boolean;
	setWrap: (value: boolean) => void;
	showLineNumbers: boolean;
	setShowLineNumbers: (value: boolean) => void;
	alignment: string;
	setAlignment: (value: string) => void;
	language: string;
	setLanguage: (value: string) => void;
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

const STORAGE_KEY = "next-pen-settings";

const defaultSettings = {
	theme: "vs-dark",
	fontFamily: "var(--font-jetbrains)",
	fontSize: 14,
	wrap: true,
	showLineNumbers: true,
	alignment: "right",
	language: "cpp17",
};

function getStoredSettings() {
	if (typeof window === "undefined") return defaultSettings;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return { ...defaultSettings, ...JSON.parse(stored) };
		}
	} catch {
		// Fallback to defaults if parsing fails
	}
	return defaultSettings;
}

function saveSetting(key: string, value: unknown) {
	if (typeof window === "undefined") return;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		const current = stored ? JSON.parse(stored) : {};
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ ...current, [key]: value }),
		);
	} catch {
		// Silently fail if storage is unavailable
	}
}

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const stored = getStoredSettings();

	const [themeState, setThemeState] = useState(stored.theme);
	const [fontFamilyState, setFontFamilyState] = useState(stored.fontFamily);
	const [fontSizeState, setFontSizeState] = useState(stored.fontSize);
	const [wrapState, setWrapState] = useState(stored.wrap);
	const [showLineNumbersState, setShowLineNumbersState] = useState(
		stored.showLineNumbers,
	);
	const [alignmentState, setAlignmentState] = useState(stored.alignment);
	const [languageState, setLanguageState] = useState(stored.language);

	const setTheme = useCallback((value: string) => {
		setThemeState(value);
		saveSetting("theme", value);
	}, []);

	const setFontFamily = useCallback((value: string) => {
		setFontFamilyState(value);
		saveSetting("fontFamily", value);
	}, []);

	const setFontSize = useCallback((value: number) => {
		setFontSizeState(value);
		saveSetting("fontSize", value);
	}, []);

	const setWrap = useCallback((value: boolean) => {
		setWrapState(value);
		saveSetting("wrap", value);
	}, []);

	const setShowLineNumbers = useCallback((value: boolean) => {
		setShowLineNumbersState(value);
		saveSetting("showLineNumbers", value);
	}, []);

	const setAlignment = useCallback((value: string) => {
		setAlignmentState(value);
		saveSetting("alignment", value);
	}, []);

	const setLanguage = useCallback((value: string) => {
		setLanguageState(value);
		saveSetting("language", value);
	}, []);

	const [code, setCode] = useState(
		(supportedLanguages[stored.language as keyof typeof supportedLanguages]
			?.boilerplate as string) ||
			(supportedLanguages.cpp17.boilerplate as string),
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
				theme: themeState,
				setTheme,
				fontFamily: fontFamilyState,
				setFontFamily,
				fontSize: fontSizeState,
				setFontSize,
				wrap: wrapState,
				setWrap,
				showLineNumbers: showLineNumbersState,
				setShowLineNumbers,
				alignment: alignmentState,
				setAlignment,
				language: languageState,
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
