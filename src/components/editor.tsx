import Editor, { loader } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { useEffect, useRef, useState } from "react";
import { createHighlighter } from "shiki";
import { shikiThemes } from "@/lib/constants";
import { supportedLanguages } from "@/lib/supported-languages";
import { SupportedLanguage } from "@/lib/types";
import {
	useEditorTheme,
	useEditorFontFamily,
	useEditorFontSize,
	useEditorWrap,
	useEditorShowLineNumbers,
	useEditorMinimap,
	useEditorVimMode,
} from "@/stores/editor-settings-store";

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
	const theme = useEditorTheme();
	const fontFamily = useEditorFontFamily();
	const fontSize = useEditorFontSize();
	const wrap = useEditorWrap();
	const showLineNumbers = useEditorShowLineNumbers();
	const minimap = useEditorMinimap();
	const vimMode = useEditorVimMode();
	const [monaco, setMonaco] = useState<any>(null);
	const [loaderConfigured, setLoaderConfigured] = useState(false);
	const [themesRegistered, setThemesRegistered] = useState(false);
	const vimModeRef = useRef<any>(null);
	const editorRef = useRef<any>(null);
	const vimStatusBarRef = useRef<HTMLDivElement>(null);

	const monacoLanguage =
		supportedLanguages[language as SupportedLanguage]?.monacoLanguage ||
		language;

	useEffect(() => {
		let cancelled = false;

		const configureMonacoLoader = async () => {
			const monacoEditor = await import("monaco-editor");
			if (cancelled) return;

			loader.config({ monaco: monacoEditor });
			setLoaderConfigured(true);

			const monacoInstance = await loader.init();
			if (cancelled) {
				monacoInstance.cancel?.();
				return;
			}

			setMonaco(monacoInstance);
		};

		configureMonacoLoader().catch((error) => {
			console.error("Monaco setup failed", error);
		});

		return () => {
			cancelled = true;
		};
	}, []);

	const handleEditorMount = (editor: any) => {
		editorRef.current = editor;

		// Initialize vim mode if it's enabled when editor mounts
		if (vimMode) {
			const setupVimMode = async () => {
				// Dispose any existing vim mode instance before initializing
				if (vimModeRef.current) {
					vimModeRef.current.dispose();
					vimModeRef.current = null;
				}
				const { initVimMode } = await import("monaco-vim");
				vimModeRef.current = initVimMode(
					editor,
					vimStatusBarRef.current,
				);
			};
			setupVimMode();
		}
	};

	// Handle vim mode toggle
	useEffect(() => {
		const editor = editorRef.current;
		if (!editor) return;

		const setupVimMode = async () => {
			if (vimMode) {
				// Enable vim mode
				if (!vimModeRef.current) {
					const { initVimMode } = await import("monaco-vim");
					vimModeRef.current = initVimMode(
						editor,
						vimStatusBarRef.current,
					);
				}
			} else {
				// Disable vim mode
				if (vimModeRef.current) {
					vimModeRef.current.dispose();
					vimModeRef.current = null;
				}
			}
		};

		setupVimMode();

		return () => {
			if (vimModeRef.current) {
				vimModeRef.current.dispose();
				vimModeRef.current = null;
			}
		};
	}, [vimMode]);

	useEffect(() => {
		if (!monaco) return;

		// Register Shiki themes with Monaco
		highlighterPromise.then((highlighter) => {
			shikiToMonaco(highlighter, monaco);
			setThemesRegistered(true);
		});
	}, [monaco]);

	return (
		<div className="flex h-full grow flex-col overflow-hidden border border-border">
			<div className="relative min-h-0 flex-1">
				{loaderConfigured ? (
					<Editor
						key={`${monacoLanguage}-${theme}-${themesRegistered}`}
						language={monacoLanguage}
						value={code}
						theme={theme}
						onChange={(value) => setCode(value || "")}
						onMount={handleEditorMount}
						loading={
							<div className="dark absolute inset-0 flex items-center justify-center bg-background">
								<span className="font-mono text-lg text-foreground">
									Loading
								</span>
							</div>
						}
						options={{
							fontSize: fontSize,
							fontFamily: fontFamily,
							wordWrap: wrap ? "on" : "off",
							lineNumbers: showLineNumbers ? "on" : "off",
							scrollBeyondLastLine: false,
							minimap: { enabled: minimap },
							automaticLayout: true,
							matchBrackets: "never",
						}}
					/>
				) : (
					<div className="dark absolute inset-0 flex items-center justify-center bg-background">
						<span className="font-mono text-lg text-foreground">
							Loading
						</span>
					</div>
				)}
			</div>
			{/* Vim status bar - only visible when vim mode is enabled */}
			<div
				ref={vimStatusBarRef}
				className={`shrink-0 border-t border-border bg-muted px-3 py-1 font-mono text-sm transition-all duration-200 ${
					vimMode ? "block" : "hidden"
				}`}
				style={{ height: vimMode ? "28px" : "0px" }}
			/>
		</div>
	);
}
