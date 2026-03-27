"use client";

import ProgrammingEditor from "@/components/programming-editor";
import WebD from "@/components/web-d";
import { useLanguage } from "@/stores/language-store";

export default function Page() {
	const language = useLanguage();

	return (
		<div className="h-full">
			{language === "webd" ? <WebD /> : <ProgrammingEditor />}
		</div>
	);
}
