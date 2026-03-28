import { create } from "zustand";
import { persist } from "zustand/middleware";
import { validThemeValues } from "@/lib/constants";

type EditorSettingsState = {
	theme: string;
	fontFamily: string;
	fontSize: number;
	wrap: boolean;
	showLineNumbers: boolean;
	minimap: boolean;
	vimMode: boolean;
};

type EditorSettingsActions = {
	setTheme: (theme: string) => void;
	setFontFamily: (font: string) => void;
	setFontSize: (size: number | ((prev: number) => number)) => void;
	setWrap: (wrap: boolean) => void;
	setShowLineNumbers: (show: boolean) => void;
	setMinimap: (minimap: boolean) => void;
	setVimMode: (vim: boolean) => void;
};

const defaultTheme = "vitesse-dark";

// Store is not exported to prevent direct subscription
const useEditorSettingsStore = create<
	EditorSettingsState & { actions: EditorSettingsActions }
>()(
	persist(
		(set) => ({
			theme: defaultTheme,
			fontFamily: "var(--font-jetbrains)",
			fontSize: 14,
			wrap: true,
			showLineNumbers: true,
			minimap: true,
			vimMode: false,
			actions: {
				setTheme: (theme) => set({ theme }),
				setFontFamily: (fontFamily) => set({ fontFamily }),
				setFontSize: (fontSize) =>
					set((state) => ({
						fontSize:
							typeof fontSize === "function"
								? fontSize(state.fontSize)
								: fontSize,
					})),
				setWrap: (wrap) => set({ wrap }),
				setShowLineNumbers: (showLineNumbers) =>
					set({ showLineNumbers }),
				setMinimap: (minimap) => set({ minimap }),
				setVimMode: (vimMode) => set({ vimMode }),
			},
		}),
		{
			name: "next-pen-editor-settings",
			partialize: (state) => ({
				theme: validThemeValues.includes(state.theme)
					? state.theme
					: defaultTheme,
				fontFamily: state.fontFamily,
				fontSize: state.fontSize,
				wrap: state.wrap,
				showLineNumbers: state.showLineNumbers,
				minimap: state.minimap,
				vimMode: state.vimMode,
			}),
		},
	),
);

// Atomic selectors - export only these
export const useEditorTheme = () =>
	useEditorSettingsStore((state) => state.theme);
export const useEditorFontFamily = () =>
	useEditorSettingsStore((state) => state.fontFamily);
export const useEditorFontSize = () =>
	useEditorSettingsStore((state) => state.fontSize);
export const useEditorWrap = () =>
	useEditorSettingsStore((state) => state.wrap);
export const useEditorShowLineNumbers = () =>
	useEditorSettingsStore((state) => state.showLineNumbers);
export const useEditorMinimap = () =>
	useEditorSettingsStore((state) => state.minimap);
export const useEditorVimMode = () =>
	useEditorSettingsStore((state) => state.vimMode);
export const useEditorSettingsActions = () =>
	useEditorSettingsStore((state) => state.actions);
