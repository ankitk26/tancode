import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link, useHydrated } from "@tanstack/react-router";
import { useTheme } from "better-themes";
import LanguageMenu from "./language-menu";
import SettingsDialog from "./settings-dialog";
import { Button } from "./ui/button";

export default function Header() {
	const { theme, setTheme } = useTheme();
	const isHydrated = useHydrated();

	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<nav className="shrink-0 px-4 py-2 shadow-md">
			<header className="flex w-full items-center justify-between">
				{/* Logo */}
				<Link to="/" className="text-lg font-medium">
					tancode
				</Link>

				{/* Navigation buttons */}
				<div className="flex items-center justify-center gap-4">
					{/* Choose language */}
					<LanguageMenu />

					{/* Opens settings modal */}
					<SettingsDialog />

					{/* Theme toggler */}
					<Button size="icon" variant="outline" onClick={toggleTheme}>
						{isHydrated ? (
							theme === "dark" ? (
								<IconSun />
							) : (
								<IconMoon />
							)
						) : (
							<span aria-hidden className="size-5" />
						)}
					</Button>
				</div>
			</header>
		</nav>
	);
}
