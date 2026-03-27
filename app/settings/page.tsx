"use client";

import { useEditor } from "@/components/app-provider";
import FontSizeInput from "@/components/font-size-input";
import Preview from "@/components/preview";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { fonts, shikiThemes } from "@/lib/constants";

export default function Settings() {
	const {
		theme,
		fontFamily,
		wrap,
		setTheme,
		setWrap,
		setFontFamily,
		showLineNumbers,
		setShowLineNumbers,
		minimap,
		setMinimap,
	} = useEditor();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-150 max-h-screen gap-6">
			{/* Preview Section */}
			<div className="h-full">
				<Preview />
			</div>

			{/* Settings menu */}
			<div className="flex flex-col w-full space-y-4 overflow-y-auto">
				<h1 className="text-lg">Settings</h1>

				<div className="space-y-2 w-full">
					{/* Change theme of editor */}
					<Label htmlFor="app-theme">Theme</Label>

					<Select
						items={shikiThemes}
						id="app-theme"
						value={theme}
						onValueChange={(updatedTheme) =>
							setTheme(updatedTheme as string)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select theme" />
						</SelectTrigger>
						<SelectContent>
							{shikiThemes.map((theme) => (
								<SelectItem
									key={theme.value}
									value={theme.value}
								>
									{theme.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Font family setting */}
				<div className="space-y-2">
					<Label htmlFor="app-font">Font</Label>
					<Select
						items={fonts}
						id="app-font"
						value={fontFamily}
						onValueChange={(updatedFont) =>
							setFontFamily(updatedFont as string)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select font" />
						</SelectTrigger>
						<SelectContent>
							{fonts.map((font) => (
								<SelectItem key={font.value} value={font.value}>
									{font.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Font size setting */}
				<div className="space-y-2">
					<Label>Font Size</Label>
					<FontSizeInput />
				</div>

				{/* Wrap content setting */}
				<div className="flex items-center mt-4 gap-4">
					<Label htmlFor="app-wrap-setting">Wrap Content</Label>
					<Switch
						id="app-wrap-setting"
						checked={wrap}
						onCheckedChange={(checked) => setWrap(checked)}
					/>
				</div>

				{/* Showing line numbers setting */}
				<div className="flex items-center gap-4">
					<Label htmlFor="app-show-line-numbers">Line Numbers</Label>
					<Switch
						id="app-show-line-numbers"
						checked={showLineNumbers}
						onCheckedChange={(checked) =>
							setShowLineNumbers(checked)
						}
					/>
				</div>

				{/* Minimap setting */}
				<div className="flex items-center gap-4">
					<Label htmlFor="app-minimap">Minimap</Label>
					<Switch
						id="app-minimap"
						checked={minimap}
						onCheckedChange={(checked) => setMinimap(checked)}
					/>
				</div>
			</div>
		</div>
	);
}
