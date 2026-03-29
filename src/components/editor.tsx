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

// Type representing the initialized Monaco editor instance
type MonacoInstance = Awaited<ReturnType<typeof loader.init>>;

// Loading screen shown while Monaco editor is initializing
const loadingOverlay = (
	<div className="dark absolute inset-0 flex items-center justify-center bg-background">
		<span className="font-mono text-lg text-foreground">Loading</span>
	</div>
);

// Maps the language prop to Monaco's language identifier
// Falls back to the input language if no mapping exists
const getMonacoLanguage = (language: string) =>
	supportedLanguages[language as SupportedLanguage]?.monacoLanguage ||
	language;

// Pre-create the Shiki highlighter with all supported themes and languages
// This promise is reused to avoid creating multiple highlighter instances
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

// Enables Vim mode on the editor instance
// Dynamically imports monaco-vim only when needed
async function enableVimMode(
	editor: any,
	statusBar: HTMLDivElement | null,
	vimModeRef: React.RefObject<any>,
) {
	if (vimModeRef.current) return;

	const { initVimMode } = await import("monaco-vim");
	vimModeRef.current = initVimMode(editor, statusBar);
}

// Disables Vim mode and cleans up the vim mode instance
function disableVimMode(vimModeRef: React.RefObject<any>) {
	vimModeRef.current?.dispose();
	vimModeRef.current = null;
}

export default function CodeEditor({ language, code, setCode }: Props) {
	// Editor settings from the global store
	const editorTheme = useEditorTheme();
	const fontFamily = useEditorFontFamily();
	const fontSize = useEditorFontSize();
	const wrap = useEditorWrap();
	const showLineNumbers = useEditorShowLineNumbers();
	const minimap = useEditorMinimap();
	const vimMode = useEditorVimMode();

	// State for Monaco initialization
	const [monaco, setMonaco] = useState<MonacoInstance | null>(null);
	const [loaderConfigured, setLoaderConfigured] = useState(false);
	const [themesRegistered, setThemesRegistered] = useState(false);

	// Refs for managing Vim mode and editor instance
	const vimModeRef = useRef<any>(null);
	const editorRef = useRef<any>(null);
	const vimStatusBarRef = useRef<HTMLDivElement>(null);

	// Get the Monaco-compatible language identifier
	const monacoLanguage = getMonacoLanguage(language);

	// Effect: Initialize Monaco editor loader on mount
	// Configures the Monaco loader and initializes the editor instance
	useEffect(() => {
		let cancelled = false;

		const configureMonacoLoader = async () => {
			// Monaco imports CSS internally, so it must only be loaded on the client.
			const monacoEditor = await import("monaco-editor");
			if (cancelled) return;

			// Configure the loader with the Monaco editor instance
			loader.config({ monaco: monacoEditor });
			setLoaderConfigured(true);

			// Initialize Monaco and get the instance
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

		// Cleanup: Set cancelled flag to prevent state updates after unmount
		return () => {
			cancelled = true;
		};
	}, []);

	// Callback when Monaco editor finishes mounting
	// Stores editor reference and enables Vim mode if it's active
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

	// Effect: Toggle Vim mode when the vimMode setting changes
	// Enables or disables Vim keybindings based on user preference
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

		// Cleanup: Disable Vim mode when effect re-runs or component unmounts
		return () => {
			disableVimMode(vimModeRef);
		};
	}, [vimMode]);

	// Effect: Register Shiki themes with Monaco once it's initialized
	// Converts Shiki themes to Monaco-compatible format and applies them
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
						key={`${monacoLanguage}-${editorTheme}-${themesRegistered}`}
						language={monacoLanguage}
						value={code}
						theme={editorTheme}
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
