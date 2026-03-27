import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEditor } from "./app-provider";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export default function CodeInput() {
	const { stdIn, setStdIn } = useEditor();
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(stdIn);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="flex flex-col h-full space-y-1">
			<div className="flex items-center justify-between">
				<h6 className="text-sm font-medium">Input</h6>
				<button
					type="button"
					onClick={handleCopy}
					className="p-1 rounded hover:bg-muted transition-colors"
					aria-label="Copy input"
				>
					{copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
				</button>
			</div>
			<Textarea
				className="w-full flex-1 resize-none min-h-[100px]"
				value={stdIn}
				onChange={(e) => setStdIn(e.target.value)}
				spellCheck={false}
				autoCorrect="false"
			/>
		</div>
	);
}
