import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useEditor } from "./app-provider";
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
		<div className="flex h-full flex-col space-y-1">
			<div className="flex items-center justify-between">
				<h6 className="text-sm font-medium">Input</h6>
				<button
					type="button"
					onClick={handleCopy}
					className="rounded p-1 transition-colors hover:bg-muted"
					aria-label="Copy input"
				>
					{copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
				</button>
			</div>
			<Textarea
				className="min-h-[100px] w-full flex-1 resize-none"
				value={stdIn}
				onChange={(e) => setStdIn(e.target.value)}
				spellCheck={false}
				autoCorrect="false"
			/>
		</div>
	);
}
