import {
	IconBrackets,
	IconCode,
	IconEye,
	IconScript,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "./editor";

const defaultHtml = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <h1 class="text-3xl font-bold text-red-500">
      Hello world!
    </h1>
  </body>
</html>`;

const basePreviewStyles = `html, body {
  margin: 0;
  min-height: 100%;
  background: white;
}`;

function buildPreviewDocument(html: string, css: string, js: string) {
	const styleTag = `<style>${basePreviewStyles}${css ? `\n${css}` : ""}</style>`;
	const scriptTag = js ? `<script>${js}</script>` : "";
	const hasFullDocument = /<!doctype html|<html[\s>]/i.test(html);

	if (hasFullDocument) {
		let doc = html;

		doc = /<\/head>/i.test(doc)
			? doc.replace(/<\/head>/i, `${styleTag}\n  </head>`)
			: doc.replace(
					/<html[^>]*>/i,
					(match) => `${match}\n<head>\n${styleTag}\n</head>`,
				);

		if (scriptTag) {
			doc = /<\/body>/i.test(doc)
				? doc.replace(/<\/body>/i, `${scriptTag}\n  </body>`)
				: `${doc}\n${scriptTag}`;
		}

		return doc;
	}

	return `<!doctype html>
<html>
  <head>
    ${styleTag}
  </head>
  <body>
    ${html}
    ${scriptTag}
  </body>
</html>`;
}

const WebD = () => {
	const [html, setHtml] = useState(defaultHtml);
	const [css, setCss] = useState("");
	const [js, setJs] = useState("");

	const [srcDoc, setSrcDoc] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(buildPreviewDocument(html, css, js));
		}, 250);

		return () => clearTimeout(timeout);
	}, [html, css, js]);

	return (
		<div className="flex h-full w-full flex-col gap-4 overflow-hidden lg:flex-row">
			{/* Editors section - top on mobile, left on desktop */}
			<div className="flex h-[400px] min-w-0 flex-col lg:h-full lg:flex-1">
				{/* Code editor tabs */}
				<Tabs
					defaultValue="html"
					className="flex min-w-0 flex-1 flex-col"
				>
					<TabsList className="h-auto w-full shrink-0 p-1">
						<TabsTrigger value="html">
							<IconCode className="size-3.5" />
							HTML
						</TabsTrigger>
						<TabsTrigger value="css">
							<IconBrackets className="size-3.5" />
							CSS
						</TabsTrigger>
						<TabsTrigger value="javascript">
							<IconScript className="size-3.5" />
							JavaScript
						</TabsTrigger>
					</TabsList>

					<div className="min-h-0 flex-1 overflow-hidden">
						<TabsContent
							value="html"
							className="m-0 h-full overflow-hidden p-0"
						>
							<Editor
								language="html"
								code={html}
								setCode={setHtml}
							/>
						</TabsContent>
						<TabsContent
							value="css"
							className="m-0 h-full overflow-hidden p-0"
						>
							<Editor
								language="css"
								code={css}
								setCode={setCss}
							/>
						</TabsContent>
						<TabsContent
							value="javascript"
							className="m-0 h-full overflow-hidden p-0"
						>
							<Editor
								language="nodejs"
								code={js}
								setCode={setJs}
							/>
						</TabsContent>
					</div>
				</Tabs>
			</div>

			{/* Preview section - bottom on mobile, right on desktop */}
			<div className="flex min-w-0 flex-1 flex-col bg-white lg:flex-1">
				<div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted px-4 py-3">
					<IconEye className="size-4" />
					<span className="text-sm font-medium">Preview</span>
				</div>
				<div className="min-h-0 flex-1 overflow-hidden bg-white">
					<iframe
						title="output"
						sandbox="allow-scripts"
						className="h-full w-full border-0 bg-white"
						srcDoc={srcDoc}
					/>
				</div>
			</div>
		</div>
	);
};

export default WebD;
