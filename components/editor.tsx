import Editor, { useMonaco } from "@monaco-editor/react";
import { useEditor } from "./app-provider";
import { supportedLanguages } from "@/lib/supported-languages";
import { SupportedLanguage } from "@/lib/types";
import { shikiToMonaco } from "@shikijs/monaco";
import { createHighlighter } from "shiki";
import { useEffect, useState } from "react";
import { shikiThemes } from "@/lib/constants";

type Props = {
	language: string;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
};

// Singleton highlighter instance
const highlighterPromise = createHighlighter({
	themes: shikiThemes.map((t: { value: string; label: string }) => t.value),
	langs: [
		"javascript",
		"typescript",
		"python",
		"rust",
		"go",
		"java",
		"cpp",
		"c",
		"html",
		"css",
		"csharp",
		"elixir",
	],
});

export default function CodeEditor({ language, code, setCode }: Props) {
	const monaco = useMonaco();
	const { theme, fontFamily, fontSize, wrap, showLineNumbers } = useEditor();
	const [themesRegistered, setThemesRegistered] = useState(false);

	const monacoLanguage =
		supportedLanguages[language as SupportedLanguage]?.monacoLanguage ||
		language;

	useEffect(() => {
		if (!monaco) return;

		// Register Shiki themes with Monaco
		highlighterPromise.then((highlighter) => {
			shikiToMonaco(highlighter, monaco);
			setThemesRegistered(true);
		});
	}, [monaco]);

	return (
		<div className="flex flex-col items-center grow h-full border border-border">
			<Editor
				key={`${monacoLanguage}-${theme}-${themesRegistered}`}
				language={monacoLanguage}
				value={code}
				theme={theme}
				onChange={(value) => setCode(value || "")}
				options={{
					fontSize: fontSize,
					fontFamily: fontFamily,
					wordWrap: wrap ? "on" : "off",
					lineNumbers: showLineNumbers ? "on" : "off",
					scrollBeyondLastLine: false,
					minimap: { enabled: false },
					automaticLayout: true,
				}}
			/>
		</div>
	);
}
