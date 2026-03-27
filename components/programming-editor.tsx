"use client";

import { useCallback, useEffect } from "react";
import { useEditor } from "./app-provider";
import CodeInput from "./code-input";
import CodeOutput from "./code-output";
import CompileButton from "./compile-button";
import Editor from "./editor";

export default function ProgrammingEditor() {
	const {
		code,
		setCode,
		language,
		stdIn,
		setOutput,
		isSubmitting,
		setIsSubmitting,
	} = useEditor();

	const submitCode = useCallback(async () => {
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			const body = JSON.stringify({
				script: code,
				stdin: stdIn,
				language,
			});

			const submissionResponse = await fetch("/api/submission", {
				method: "post",
				body,
				headers: {
					"content-type": "application/json",
				},
			});

			const submissionData = await submissionResponse.json();
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
	}, [code, language, stdIn, setOutput, setIsSubmitting, isSubmitting]);

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

	return (
		<div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden lg:flex-row">
			{/* Left side - Code Editor */}
			<section className="h-[400px] min-h-0 min-w-0 lg:h-full lg:flex-1">
				<Editor language={language} code={code} setCode={setCode} />
			</section>

			{/* Right side - Input/Output */}
			<div className="flex min-h-0 min-w-0 flex-col gap-4 lg:w-[400px] xl:w-[450px]">
				{/* Input Section */}
				<section className="flex min-h-[150px] flex-1 flex-col">
					<CodeInput />
				</section>

				{/* Compile Button */}
				<CompileButton onRun={submitCode} isSubmitting={isSubmitting} />

				{/* Output Section */}
				<section className="flex min-h-[200px] flex-[2] flex-col">
					<CodeOutput />
				</section>
			</div>
		</div>
	);
}
