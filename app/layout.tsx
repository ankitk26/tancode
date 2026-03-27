import { AppProvider } from "@/components/app-provider";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Metadata } from "next";
import {
	JetBrains_Mono,
	Fira_Code,
	Source_Code_Pro,
	Geist_Mono,
	Courier_Prime,
} from "next/font/google";
import "./app.css";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains",
	subsets: ["latin"],
});

const firaCode = Fira_Code({
	variable: "--font-fira",
	subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
	variable: "--font-source",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist",
	subsets: ["latin"],
});

const courierPrime = Courier_Prime({
	variable: "--font-courier",
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to Next.js",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html
			lang="en"
			className={`${jetbrainsMono.variable} ${firaCode.variable} ${sourceCodePro.variable} ${geistMono.variable} ${courierPrime.variable}`}
		>
			<body className={`antialiased ${jetbrainsMono.className}`}>
				<TooltipProvider>
					<AppProvider>
						<div className="flex w-full flex-col h-screen overflow-hidden">
							<Header />
							<main className="flex-1 p-4 w-full min-h-0 overflow-hidden">
								{children}
							</main>
						</div>
					</AppProvider>
				</TooltipProvider>
			</body>
		</html>
	);
};

export default Layout;
