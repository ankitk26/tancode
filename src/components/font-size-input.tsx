import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	useEditorFontSize,
	useEditorSettingsActions,
} from "@/stores/editor-settings-store";

const FontSizeInput = () => {
	const fontSize = useEditorFontSize();
	const { setFontSize } = useEditorSettingsActions();

	return (
		<div className="flex w-32 items-center border border-input">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setFontSize((p) => Math.max(1, p - 1))}
			>
				<IconMinus className="size-3" />
			</Button>

			<span className="grow text-center text-xs">{fontSize}</span>

			<Button
				variant="ghost"
				size="icon"
				onClick={() => setFontSize((p) => p + 1)}
			>
				<IconPlus className="size-3" />
			</Button>
		</div>
	);
};

export default FontSizeInput;
