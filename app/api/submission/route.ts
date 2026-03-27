import { NextRequest } from "next/server";
import { compilerLanguages } from "@/lib/supported-languages";
import { CompilerLanguage } from "@/lib/types";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { value: languageCode, jdoodleVersionIndex } =
			compilerLanguages[body.language as CompilerLanguage];

		const inputParams = {
			...body,
			language: languageCode,
			versionIndex: jdoodleVersionIndex,
			clientId: process.env.JDOODLE_CLIENT_ID,
			clientSecret: process.env.JDOODLE_CLIENT_SECRET,
		};

		const response = await fetch("https://api.jdoodle.com/v1/execute", {
			method: "post",
			body: JSON.stringify(inputParams),
			headers: { "Content-type": "application/json" },
		});

		const data = await response.json();

		return Response.json({
			output: data.output,
			isExecutionSuccess: data.isExecutionSuccess,
		});
	} catch {
		return Response.error();
	}
}
