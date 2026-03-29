import { createServerFn } from "@tanstack/react-start";
import { compilerLanguages } from "@/lib/supported-languages";
import { CompilerLanguage, SubmissionOutput } from "@/lib/types";

type SubmitCodeInput = {
	script: string;
	stdin: string;
	language: CompilerLanguage;
};

function getJdoodlePayload(data: SubmitCodeInput) {
	const { value: languageCode, jdoodleVersionIndex } =
		compilerLanguages[data.language];

	return {
		...data,
		language: languageCode,
		versionIndex: jdoodleVersionIndex,
		clientId: process.env.JDOODLE_CLIENT_ID,
		clientSecret: process.env.JDOODLE_CLIENT_SECRET,
	};
}

export const submitCode = createServerFn({ method: "POST" })
	.inputValidator((data: SubmitCodeInput) => data)
	.handler(async ({ data }): Promise<SubmissionOutput> => {
		const response = await fetch("https://api.jdoodle.com/v1/execute", {
			method: "post",
			// The browser sends editor state to this server fn; credentials are added here.
			body: JSON.stringify(getJdoodlePayload(data)),
			headers: { "content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error(
				`Jdoodle request failed with status ${response.status}`,
			);
		}

		const result = (await response.json()) as SubmissionOutput;

		return {
			output: result.output,
			isExecutionSuccess: result.isExecutionSuccess,
		};
	});
