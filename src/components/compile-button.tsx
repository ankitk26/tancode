import { IconLoader } from "@tabler/icons-react";
import { formatForDisplay } from "@tanstack/react-hotkeys";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
	onRun: () => void;
	isSubmitting: boolean;
};

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
				<p>Run code ({formatForDisplay("Mod+Enter")})</p>
			</TooltipContent>
		</Tooltip>
	);
}
