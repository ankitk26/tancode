import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

type ThemeState = {
	mode: ThemeMode;
};

type ThemeActions = {
	toggleMode: () => void;
	setMode: (mode: ThemeMode) => void;
};

const applyDarkModeClass = (mode: ThemeMode) => {
	if (typeof document === "undefined") return;
	if (mode === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
};

// Store is not exported to prevent direct subscription
const useThemeStore = create<ThemeState & { actions: ThemeActions }>()(
	persist(
		(set) => ({
			mode: "dark",
			actions: {
				toggleMode: () =>
					set((state) => {
						const next = state.mode === "dark" ? "light" : "dark";
						applyDarkModeClass(next);
						return { mode: next };
					}),
				setMode: (mode) => {
					applyDarkModeClass(mode);
					set({ mode });
				},
			},
		}),
		{
			name: "next-pen-theme",
			onRehydrateStorage: () => (state) => {
				if (state) {
					applyDarkModeClass(state.mode);
				}
			},
		},
	),
);

// Atomic selectors - export only these
export const useThemeMode = () => useThemeStore((state) => state.mode);
export const useThemeActions = () => useThemeStore((state) => state.actions);
