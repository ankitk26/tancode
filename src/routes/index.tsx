import { createFileRoute } from "@tanstack/react-router";
import ProgrammingEditor from "@/components/programming-editor";
import WebD from "@/components/web-d";
import { useLanguage } from "@/stores/language-store";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const language = useLanguage();

	return (
		<div className="h-full">
			{language === "webd" ? <WebD /> : <ProgrammingEditor />}
		</div>
	);
}
