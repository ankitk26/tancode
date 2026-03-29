import { compilerLanguages } from "@/lib/supported-languages";
import { AppLanguage, CompilerLanguage } from "@/lib/types";
import { useCodeExecutionActions } from "@/stores/code-execution-store";
import { useLanguage, useLanguageActions } from "@/stores/language-store";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

function isCompilerLanguage(
	language: AppLanguage,
): language is CompilerLanguage {
	return language !== "webd";
}

const compilerLanguagesList = [
	...Object.values(compilerLanguages).map(({ value, label }) => ({
		value,
		label,
	})),
	{ value: "webd", label: "Web Development" },
] as const;

export default function LanguageMenu() {
	const selectedLanguage = useLanguage();
	const { setLanguage } = useLanguageActions();
	const { resetCodeToBoilerplate } = useCodeExecutionActions();

	const handleLanguageChange = (val: string | null) => {
		if (!val) return;

		const nextLanguage = val as AppLanguage;
		if (nextLanguage === selectedLanguage) return;

		setLanguage(nextLanguage);

		if (isCompilerLanguage(nextLanguage)) {
			resetCodeToBoilerplate(nextLanguage);
		}
	};

	return (
		<Select
			items={compilerLanguagesList}
			value={selectedLanguage}
			onValueChange={handleLanguageChange}
		>
			<SelectTrigger className="w-48">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{compilerLanguagesList.map((language) => (
						<SelectItem key={language.value} value={language.value}>
							{language.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
