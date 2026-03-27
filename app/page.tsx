"use client";

import ProgrammingEditor from "@/components/programming-editor";
import WebD from "@/components/web-d";
import { useLanguageStore } from "@/stores/language-store";

export default function Page() {
	const { language } = useLanguageStore();

	return (
		<div className="h-full">
			{language === "webd" ? <WebD /> : <ProgrammingEditor />}
		</div>
	);
}
