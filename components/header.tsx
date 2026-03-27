"use client";

import { IconMoon, IconSettings, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useThemeStore } from "@/stores/theme-store";
import LanguageMenu from "./language-menu";
import { Button } from "./ui/button";

export default function Header() {
	const { mode, toggleMode } = useThemeStore();

	return (
		<nav className="shrink-0 px-4 py-2 shadow-md">
			<header className="flex w-full items-center justify-between">
				{/* Logo */}
				<Link href="/" className="text-lg font-medium">
					nextpen
				</Link>

				{/* Navigation buttons */}
				<div className="flex items-center justify-center gap-4">
					{/* Choose language */}
					<LanguageMenu />

					{/* Opens settings modal */}
					<Link href="/settings">
						<Button size="icon">
							<IconSettings />
						</Button>
					</Link>

					{/* Theme toggler */}
					<Button size="icon" variant="outline" onClick={toggleMode}>
						{mode === "dark" ? <IconSun /> : <IconMoon />}
					</Button>
				</div>
			</header>
		</nav>
	);
}
