import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEditor } from "./app-provider";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export default function CodeOutput() {
	const { output } = useEditor();
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
		<div className="flex flex-col h-full space-y-1">
			<div className="flex items-center justify-between">
				<h6 className="text-sm font-medium">Output</h6>
				<button
					type="button"
					onClick={handleCopy}
					className="p-1 rounded hover:bg-muted transition-colors"
					aria-label="Copy output"
				>
					{copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
				</button>
			</div>
			<Textarea
				className="w-full flex-1 resize-none min-h-[150px]"
				aria-invalid={!output.isExecutionSuccess}
				value={output.output}
				readOnly
				spellCheck={false}
				aria-readonly
			/>
		</div>
	);
}
