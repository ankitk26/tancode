import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
	mode: "light" | "dark";
	toggleMode: () => void;
	setMode: (mode: "light" | "dark") => void;
};

const applyDarkModeClass = (mode: "light" | "dark") => {
	if (typeof document === "undefined") return;
	if (mode === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
};

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			mode: "dark",
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
