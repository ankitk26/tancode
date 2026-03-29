import { IconSettings } from "@tabler/icons-react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useState } from "react";
import FontSizeInput from "@/components/font-size-input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { fonts, shikiThemes } from "@/lib/constants";
import {
	useEditorFontFamily,
	useEditorMinimap,
	useEditorSettingsActions,
	useEditorShowLineNumbers,
	useEditorTheme,
	useEditorVimMode,
	useEditorWrap,
} from "@/stores/editor-settings-store";
import SettingsRow from "./settings-dialog-row";
import { Button } from "./ui/button";

export default function SettingsDialog() {
	const [open, setIsOpen] = useState(false);

	const theme = useEditorTheme();
	const fontFamily = useEditorFontFamily();
	const wrap = useEditorWrap();
	const showLineNumbers = useEditorShowLineNumbers();
	const minimap = useEditorMinimap();
	const vimMode = useEditorVimMode();
	const {
		setTheme,
		setWrap,
		setFontFamily,
		setShowLineNumbers,
		setMinimap,
		setVimMode,
	} = useEditorSettingsActions();

	useHotkey("Mod+,", () => setIsOpen(true));

	return (
		<Dialog open={open} onOpenChange={setIsOpen}>
			<DialogTrigger
				render={
					<Button size="icon">
						<IconSettings />
					</Button>
				}
			/>
			<DialogContent className="flex h-fit min-w-0 flex-col bg-background sm:max-w-150">
				<DialogHeader>
					<DialogTitle>Editor Settings</DialogTitle>
					<DialogDescription>
						Tune the editor in one place and get back to work
						immediately.
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="min-h-0 flex-1">
					<div className="space-y-3">
						<SettingsRow label="Theme">
							<div className="w-full sm:w-56">
								<Label
									htmlFor="settings-theme"
									className="sr-only"
								>
									Theme
								</Label>
								<Select
									items={shikiThemes}
									id="settings-theme"
									value={theme}
									onValueChange={(updatedTheme) =>
										setTheme(updatedTheme as string)
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select theme" />
									</SelectTrigger>
									<SelectContent>
										{shikiThemes.map((themeOption) => (
											<SelectItem
												key={themeOption.value}
												value={themeOption.value}
											>
												{themeOption.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</SettingsRow>

						<SettingsRow label="Font">
							<div className="w-full sm:w-56">
								<Label
									htmlFor="settings-font"
									className="sr-only"
								>
									Font
								</Label>
								<Select
									items={fonts}
									id="settings-font"
									value={fontFamily}
									onValueChange={(updatedFont) =>
										setFontFamily(updatedFont as string)
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select font" />
									</SelectTrigger>
									<SelectContent>
										{fonts.map((fontOption) => (
											<SelectItem
												key={fontOption.value}
												value={fontOption.value}
											>
												{fontOption.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</SettingsRow>

						<SettingsRow label="Font Size">
							<FontSizeInput />
						</SettingsRow>

						<SettingsRow label="Wrap Content">
							<div className="flex items-center gap-3">
								<Label htmlFor="settings-wrap">
									{wrap ? "On" : "Off"}
								</Label>
								<Switch
									id="settings-wrap"
									checked={wrap}
									onCheckedChange={(checked) =>
										setWrap(checked)
									}
								/>
							</div>
						</SettingsRow>

						<SettingsRow label="Line Numbers">
							<div className="flex items-center gap-3">
								<Label htmlFor="settings-line-numbers">
									{showLineNumbers ? "On" : "Off"}
								</Label>
								<Switch
									id="settings-line-numbers"
									checked={showLineNumbers}
									onCheckedChange={(checked) =>
										setShowLineNumbers(checked)
									}
								/>
							</div>
						</SettingsRow>

						<SettingsRow label="Minimap">
							<div className="flex items-center gap-3">
								<Label htmlFor="settings-minimap">
									{minimap ? "On" : "Off"}
								</Label>
								<Switch
									id="settings-minimap"
									checked={minimap}
									onCheckedChange={(checked) =>
										setMinimap(checked)
									}
								/>
							</div>
						</SettingsRow>

						<SettingsRow label="Vim Mode">
							<div className="flex items-center gap-3">
								<Label htmlFor="settings-vim-mode">
									{vimMode ? "On" : "Off"}
								</Label>
								<Switch
									id="settings-vim-mode"
									checked={vimMode}
									onCheckedChange={(checked) =>
										setVimMode(checked)
									}
								/>
							</div>
						</SettingsRow>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
