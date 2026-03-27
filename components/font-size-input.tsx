import { Button } from "@/components/ui/button";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useEditor } from "./app-provider";

const FontSizeInput = () => {
	const { fontSize, setFontSize } = useEditor();

	return (
		<div className="flex items-center w-32 border border-input">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setFontSize((p) => Math.max(1, p - 1))}
			>
				<IconMinus className="size-3" />
			</Button>

			<span className="grow text-xs text-center">{fontSize}</span>

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
