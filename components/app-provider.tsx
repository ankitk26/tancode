"use client";

import { SubmissionOutput } from "@/lib/types";
import { supportedLanguages } from "@/lib/supported-languages";
import { validThemeValues } from "@/lib/constants";
import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

type AppState = {
	mode: "light" | "dark";
	toggleMode: () => void;
	theme: string;
	setTheme: (value: string) => void;
	fontFamily: string;
	setFontFamily: (value: string) => void;
	fontSize: number;
	setFontSize: (value: number | ((prev: number) => number)) => void;
	wrap: boolean;
	setWrap: (value: boolean) => void;
	showLineNumbers: boolean;
	setShowLineNumbers: (value: boolean) => void;
	minimap: boolean;
	setMinimap: (value: boolean) => void;
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
	mode: "dark" as "light" | "dark",
	theme: "vitesse-dark",
	fontFamily: "var(--font-jetbrains)",
	fontSize: 14,
	wrap: true,
	showLineNumbers: true,
	minimap: true,
	alignment: "right",
	language: "cpp17",
};

function getStoredSettings() {
	if (typeof window === "undefined") return defaultSettings;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			// Validate theme - fallback to default if invalid
			const theme = validThemeValues.includes(parsed.theme)
				? parsed.theme
				: defaultSettings.theme;
			// Validate mode - fallback to default if invalid
			const mode =
				parsed.mode === "light" || parsed.mode === "dark"
					? parsed.mode
					: defaultSettings.mode;
			return { ...defaultSettings, ...parsed, theme, mode };
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
	// Initialize with default settings to avoid SSR/hydration mismatch
	const [modeState, setModeState] = useState<"light" | "dark">(
		defaultSettings.mode,
	);
	const [themeState, setThemeState] = useState(defaultSettings.theme);
	const [fontFamilyState, setFontFamilyState] = useState(
		defaultSettings.fontFamily,
	);
	const [fontSizeState, setFontSizeState] = useState(
		defaultSettings.fontSize,
	);
	const [wrapState, setWrapState] = useState(defaultSettings.wrap);
	const [showLineNumbersState, setShowLineNumbersState] = useState(
		defaultSettings.showLineNumbers,
	);
	const [minimapState, setMinimapState] = useState(defaultSettings.minimap);
	const [alignmentState, setAlignmentState] = useState(
		defaultSettings.alignment,
	);
	const [languageState, setLanguageState] = useState(
		defaultSettings.language,
	);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load settings from localStorage on client-side only
	useEffect(() => {
		const stored = getStoredSettings();
		setModeState(stored.mode);
		setThemeState(stored.theme);
		setFontFamilyState(stored.fontFamily);
		setFontSizeState(stored.fontSize);
		setWrapState(stored.wrap);
		setShowLineNumbersState(stored.showLineNumbers);
		setMinimapState(stored.minimap);
		setAlignmentState(stored.alignment);
		setLanguageState(stored.language);
		setIsLoaded(true);
	}, []);

	// Apply dark mode class to document
	useEffect(() => {
		if (modeState === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [modeState]);

	const toggleMode = useCallback(() => {
		setModeState((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			saveSetting("mode", next);
			return next;
		});
	}, []);

	const setTheme = useCallback((value: string) => {
		setThemeState(value);
		saveSetting("theme", value);
	}, []);

	const setFontFamily = useCallback((value: string) => {
		setFontFamilyState(value);
		saveSetting("fontFamily", value);
	}, []);

	const setFontSize = useCallback(
		(value: number | ((prev: number) => number)) => {
			setFontSizeState((prev: number) => {
				const newValue =
					typeof value === "function" ? value(prev) : value;
				saveSetting("fontSize", newValue);
				return newValue;
			});
		},
		[],
	);

	const setWrap = useCallback((value: boolean) => {
		setWrapState(value);
		saveSetting("wrap", value);
	}, []);

	const setShowLineNumbers = useCallback((value: boolean) => {
		setShowLineNumbersState(value);
		saveSetting("showLineNumbers", value);
	}, []);

	const setMinimap = useCallback((value: boolean) => {
		setMinimapState(value);
		saveSetting("minimap", value);
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
		(supportedLanguages[
			defaultSettings.language as keyof typeof supportedLanguages
		]?.boilerplate as string) ||
			(supportedLanguages.cpp17.boilerplate as string),
	);

	// Update code when language is loaded from localStorage
	useEffect(() => {
		if (isLoaded) {
			const newBoilerplate =
				(supportedLanguages[
					languageState as keyof typeof supportedLanguages
				]?.boilerplate as string) ||
				(supportedLanguages.cpp17.boilerplate as string);
			setCode(newBoilerplate);
		}
	}, [isLoaded, languageState]);
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
				mode: modeState,
				toggleMode,
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
				minimap: minimapState,
				setMinimap,
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
