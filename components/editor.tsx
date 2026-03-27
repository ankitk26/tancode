import Editor from "@monaco-editor/react";
import { useEditor } from "./app-provider";
import { supportedLanguages } from "@/lib/supported-languages";
import { SupportedLanguage } from "@/lib/types";

type Props = {
	language: string;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
};

// Monaco built-in themes: vs (light), vs-dark, hc-black, hc-light

export default function CodeEditor({ language, code, setCode }: Props) {
	const { theme, fontFamily, fontSize, wrap, showLineNumbers } = useEditor();

	const monacoTheme = theme || "vs-dark";
	const monacoLanguage =
		supportedLanguages[language as SupportedLanguage]?.monacoLanguage ||
		language;

	return (
		<div className="flex flex-col items-center grow h-full border border-border">
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
