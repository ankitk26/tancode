"use client";

import { IconMoon, IconSettings, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import LanguageMenu from "./language-menu";
import { Button } from "./ui/button";
import { useEditor } from "./app-provider";

export default function Header() {
	const { mode, toggleMode } = useEditor();

	return (
		<nav className="py-2 px-4 shadow-md shrink-0">
			<header className="w-full flex items-center justify-between">
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
