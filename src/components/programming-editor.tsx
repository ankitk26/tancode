import { useHotkey } from "@tanstack/react-hotkeys";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect } from "react";
import { submitCode as submitCodeServerFn } from "@/lib/submit-code";
import { CompilerLanguage } from "@/lib/types";
import {
	useCodeExecutionCode,
	useCodeExecutionStdIn,
	useCodeExecutionIsSubmitting,
	useCodeExecutionActions,
} from "@/stores/code-execution-store";
import { useLanguage } from "@/stores/language-store";
import CodeInput from "./code-input";
import CodeOutput from "./code-output";
import CompileButton from "./compile-button";
import Editor from "./editor";

function isCompilerLanguage(language: string): language is CompilerLanguage {
	return language !== "webd";
}

export default function ProgrammingEditor() {
	const language = useLanguage();
	const code = useCodeExecutionCode();
	const stdIn = useCodeExecutionStdIn();
	const isSubmitting = useCodeExecutionIsSubmitting();
	const { setCode, setOutput, setIsSubmitting } = useCodeExecutionActions();
	const submitCodeFn = useServerFn(submitCodeServerFn);

	const submitCode = useCallback(async () => {
		if (isSubmitting || !isCompilerLanguage(language)) return;

		setIsSubmitting(true);

		try {
			const submissionData = await submitCodeFn({
				data: {
					script: code,
					stdin: stdIn,
					language,
				},
			});
			setOutput({
				output: submissionData.output,
				isExecutionSuccess: submissionData.isExecutionSuccess,
			});
		} catch (error) {
			setOutput(null);
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	}, [
		code,
		language,
		stdIn,
		setOutput,
		setIsSubmitting,
		isSubmitting,
		submitCodeFn,
	]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!event.metaKey && !event.ctrlKey) return;
			if (event.shiftKey || event.altKey) return;
			if (event.key !== "Enter" && event.code !== "Enter") return;

			event.preventDefault();
			event.stopPropagation();
			submitCode();
		};

		window.addEventListener("keydown", handleKeyDown, true);
		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [submitCode]);

	useHotkey("Mod+Enter", (event) => {
		event.stopPropagation();
		event.preventDefault();
		submitCode();
	});

	return (
		<div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden lg:flex-row">
			<section className="h-[400px] min-h-0 min-w-0 lg:h-full lg:flex-1">
				<Editor language={language} code={code} setCode={setCode} />
			</section>

			<div className="flex min-h-0 min-w-0 flex-col gap-4 lg:w-[400px] xl:w-[450px]">
				<section className="flex min-h-[150px] flex-1 flex-col">
					<CodeInput />
				</section>

				<CompileButton onRun={submitCode} isSubmitting={isSubmitting} />

				<section className="flex min-h-[200px] flex-[2] flex-col">
					<CodeOutput />
				</section>
			</div>
		</div>
	);
}
