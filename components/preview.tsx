import { useState } from "react";
import { cssPreview, htmlPreview, jsPreview } from "@/lib/constants";
import Editor from "./editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Preview() {
	const [html, setHtml] = useState(htmlPreview);
	const [css, setCss] = useState(cssPreview);
	const [js, setJs] = useState(jsPreview);

	return (
		<div className="h-full w-full">
			<Tabs defaultValue="html" className="flex h-full w-full flex-col">
				<TabsList className="w-full">
					<TabsTrigger value="html">HTML</TabsTrigger>
					<TabsTrigger value="css">CSS</TabsTrigger>
					<TabsTrigger value="js">JavaScript</TabsTrigger>
				</TabsList>
				<TabsContent value="html" className="mt-2 w-full flex-1">
					<div className="h-full w-full">
						<Editor language="html" code={html} setCode={setHtml} />
					</div>
				</TabsContent>
				<TabsContent value="css" className="mt-2 w-full flex-1">
					<div className="h-full w-full">
						<Editor language="css" code={css} setCode={setCss} />
					</div>
				</TabsContent>
				<TabsContent value="js" className="mt-2 w-full flex-1">
					<div className="h-full w-full">
						<Editor language="nodejs" code={js} setCode={setJs} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
