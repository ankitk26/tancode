import Editor from "@monaco-editor/react";
import { useEditor } from "./app-provider";
import { supportedLanguages } from "@/lib/supported-languages";
import { SupportedLanguage } from "@/lib/types";

type Props = {
	language: string;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
};

// Map Ace themes to Monaco themes
const themeMap: Record<string, string> = {
	cobalt: "vs-dark",
	dracula: "vs-dark",
	monokai: "vs-dark",
	nord_dark: "vs-dark",
	one_dark: "vs-dark",
	tomorrow_night: "vs-dark",
	tomorrow_night_blue: "vs-dark",
	tomorrow_night_eighties: "vs-dark",
	vibrant_ink: "vs-dark",
};

export default function CodeEditor({ language, code, setCode }: Props) {
	const { theme, fontFamily, fontSize, wrap, showLineNumbers } = useEditor();

	const monacoTheme = themeMap[theme] || "vs-dark";
	const monacoLanguage =
		supportedLanguages[language as SupportedLanguage]?.monacoLanguage ||
		language;

	return (
		<div className="flex flex-col items-center grow h-full">
			<Editor
				language={monacoLanguage}
				value={code}
				theme={monacoTheme}
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
