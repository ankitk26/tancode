import { IconLoader } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
	onRun: () => void;
	isSubmitting: boolean;
};

const isMac =
	typeof window !== "undefined" &&
	/navigator\.platform|iPhone|iPad|iPod|Mac/i.test(navigator.platform);

export default function CompileButton({ onRun, isSubmitting }: Props) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						onClick={onRun}
						className="w-full"
						disabled={isSubmitting}
					/>
				}
			>
				{isSubmitting ? <IconLoader className="animate-spin" /> : "Run"}
			</TooltipTrigger>
			<TooltipContent side="top">
				<p>Run code ({isMac ? "⌘" : "Ctrl"}+Enter)</p>
			</TooltipContent>
		</Tooltip>
	);
}
