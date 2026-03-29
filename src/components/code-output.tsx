import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useCodeExecutionOutput } from "@/stores/code-execution-store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CodeOutput() {
	const output = useCodeExecutionOutput();
	const [copied, setCopied] = useState(false);

	if (!output) {
		return null;
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(output.output);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="flex h-full flex-col space-y-1">
			<div className="flex items-center justify-between">
				<h6 className="text-sm font-medium">Output</h6>
				<Button
					type="button"
					onClick={handleCopy}
					size="icon-sm"
					variant="ghost"
				>
					{copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
				</Button>
			</div>
			<Textarea
				className="min-h-[150px] w-full flex-1 resize-none"
				aria-invalid={!output.isExecutionSuccess}
				value={output.output}
				readOnly
				spellCheck={false}
				aria-readonly
			/>
		</div>
	);
}
