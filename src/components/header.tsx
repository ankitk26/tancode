import { IconMoon, IconSettings, IconSun } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "better-themes";
import LanguageMenu from "./language-menu";
import { Button } from "./ui/button";

export default function Header() {
	const { theme, setTheme } = useTheme();

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
					<Link to="/settings">
						<Button size="icon">
							<IconSettings />
						</Button>
					</Link>

					{/* Theme toggler */}
					<Button size="icon" variant="outline" onClick={toggleTheme}>
						{theme === "dark" ? <IconSun /> : <IconMoon />}
					</Button>
				</div>
			</header>
		</nav>
	);
}
