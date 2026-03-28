/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import appCss from "@/styles/app.css?url";

// const jetbrainsMono = JetBrains_Mono({
//   variable: "--font-jetbrains",
//   subsets: ["latin"],
// });

// const firaCode = Fira_Code({
//   variable: "--font-fira",
//   subsets: ["latin"],
// });

// const sourceCodePro = Source_Code_Pro({
//   variable: "--font-source",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist",
//   subsets: ["latin"],
// });

// const courierPrime = Courier_Prime({
//   variable: "--font-courier",
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "tancode" },
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			// className={`${jetbrainsMono.variable} ${firaCode.variable} ${sourceCodePro.variable} ${geistMono.variable} ${courierPrime.variable}`}
		>
			<head>
				<HeadContent />
			</head>
			<body className="antialiased">
				<TooltipProvider>
					<div className="flex h-screen w-full flex-col overflow-hidden">
						<Header />
						<main className="min-h-0 w-full flex-1 overflow-hidden p-4">
							{children}
						</main>
					</div>
				</TooltipProvider>
			</body>
		</html>
	);
}
