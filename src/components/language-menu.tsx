import { compilerLanguages } from "@/lib/supported-languages";
import { AppLanguage, CompilerLanguage } from "@/lib/types";
import { useCodeExecutionActions } from "@/stores/code-execution-store";
import { useLanguageActions } from "@/stores/language-store";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function LanguageMenu() {
	const { setLanguage } = useLanguageActions();
	const { resetCodeToBoilerplate } = useCodeExecutionActions();

	const compilerLanguagesList = Object.values(compilerLanguages).map(
		({ value, label }) => ({ value, label }),
	);

	const handleLanguageChange = (val: string | null) => {
		if (!val) return;
		const language = val as AppLanguage;
		setLanguage(language);
		// Reset code to boilerplate when language changes
		if (language !== "webd") {
			resetCodeToBoilerplate(language as CompilerLanguage);
		}
	};

	return (
		<Select
			items={compilerLanguagesList}
			onValueChange={handleLanguageChange}
			defaultValue="cpp17"
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
					<SelectItem value="webd">Web Development</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
