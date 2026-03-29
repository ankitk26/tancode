import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import {
	useCodeExecutionStdIn,
	useCodeExecutionActions,
} from "@/stores/code-execution-store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CodeInput() {
	const stdIn = useCodeExecutionStdIn();
	const { setStdIn } = useCodeExecutionActions();
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(stdIn);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="flex h-full flex-col space-y-1">
			<div className="flex items-center justify-between">
				<h6 className="text-sm font-medium">Input</h6>
				<Button
					type="button"
					onClick={handleCopy}
					size="icon-sm"
					variant="ghost"
				>
					{copied ? <IconCheck /> : <IconCopy />}
				</Button>
			</div>
			<Textarea
				className="min-h-25 w-full flex-1 resize-none"
				value={stdIn}
				onChange={(e) => setStdIn(e.target.value)}
				spellCheck={false}
				autoCorrect="false"
			/>
		</div>
	);
}
