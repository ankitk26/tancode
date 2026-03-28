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

type MonacoInstance = Awaited<ReturnType<typeof loader.init>>;

const loadingOverlay = (
	<div className="dark absolute inset-0 flex items-center justify-center bg-background">
		<span className="font-mono text-lg text-foreground">Loading</span>
	</div>
);

const getMonacoLanguage = (language: string) =>
	supportedLanguages[language as SupportedLanguage]?.monacoLanguage ||
	language;

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

async function enableVimMode(
	editor: any,
	statusBar: HTMLDivElement | null,
	vimModeRef: React.MutableRefObject<any>,
) {
	if (vimModeRef.current) return;

	const { initVimMode } = await import("monaco-vim");
	vimModeRef.current = initVimMode(editor, statusBar);
}

function disableVimMode(vimModeRef: React.MutableRefObject<any>) {
	vimModeRef.current?.dispose();
	vimModeRef.current = null;
}

export default function CodeEditor({ language, code, setCode }: Props) {
	const theme = useEditorTheme();
	const fontFamily = useEditorFontFamily();
	const fontSize = useEditorFontSize();
	const wrap = useEditorWrap();
	const showLineNumbers = useEditorShowLineNumbers();
	const minimap = useEditorMinimap();
	const vimMode = useEditorVimMode();
	const [monaco, setMonaco] = useState<MonacoInstance | null>(null);
	const [loaderConfigured, setLoaderConfigured] = useState(false);
	const [themesRegistered, setThemesRegistered] = useState(false);
	const vimModeRef = useRef<any>(null);
	const editorRef = useRef<any>(null);
	const vimStatusBarRef = useRef<HTMLDivElement>(null);
	const monacoLanguage = getMonacoLanguage(language);

	useEffect(() => {
		let cancelled = false;

		const configureMonacoLoader = async () => {
			// Monaco imports CSS internally, so it must only be loaded on the client.
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

		if (vimMode) {
			enableVimMode(editor, vimStatusBarRef.current, vimModeRef).catch(
				(error) => {
					console.error("Failed to enable Vim mode", error);
				},
			);
		}
	};

	useEffect(() => {
		const editor = editorRef.current;
		if (!editor) return;

		const setupVimMode = async () => {
			if (vimMode) {
				await enableVimMode(
					editor,
					vimStatusBarRef.current,
					vimModeRef,
				);
			} else {
				disableVimMode(vimModeRef);
			}
		};

		setupVimMode().catch((error) => {
			console.error("Failed to toggle Vim mode", error);
		});

		return () => {
			disableVimMode(vimModeRef);
		};
	}, [vimMode]);

	useEffect(() => {
		if (!monaco) return;

		// Shiki themes have to be registered after Monaco has finished booting.
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
						loading={loadingOverlay}
						options={{
							fontSize,
							fontFamily,
							wordWrap: wrap ? "on" : "off",
							lineNumbers: showLineNumbers ? "on" : "off",
							scrollBeyondLastLine: false,
							minimap: { enabled: minimap },
							automaticLayout: true,
							matchBrackets: "never",
						}}
					/>
				) : (
					loadingOverlay
				)}
			</div>
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
