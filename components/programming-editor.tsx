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
			if (
				!event.ctrlKey ||
				event.shiftKey ||
				event.altKey ||
				event.metaKey
			)
				return;
			if (event.key.toLowerCase() !== "r" && event.code !== "KeyR")
				return;

			event.preventDefault();
			event.stopPropagation();
			submitCode();
		};

		window.addEventListener("keydown", handleKeyDown, true);
		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [submitCode]);

	return (
		<div className="flex flex-col lg:flex-row gap-4 lg:h-full lg:overflow-hidden">
			{/* Left side - Code Editor */}
			<section className="h-[400px] lg:flex-1 lg:h-full">
				<Editor language={language} code={code} setCode={setCode} />
			</section>

			{/* Right side - Input/Output */}
			<div className="flex flex-col gap-4 lg:w-[400px] xl:w-[450px]">
				{/* Input Section */}
				<section className="flex-1 flex flex-col min-h-[150px]">
					<CodeInput />
				</section>

				{/* Compile Button */}
				<CompileButton onRun={submitCode} isSubmitting={isSubmitting} />

				{/* Output Section */}
				<section className="flex-[2] flex flex-col min-h-[200px]">
					<CodeOutput />
				</section>
			</div>
		</div>
	);
}
