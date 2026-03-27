export const compilerLanguages = {
	cpp17: {
		value: "cpp17",
		label: "C++",
		jdoodleVersionIndex: "2",
		monacoLanguage: "cpp",
		boilerplate:
			'#include <iostream>\n\nint main() {\n    std::cout << "coding with C++" << std::endl;\n    return 0;\n}',
	},
	c: {
		value: "c",
		label: "C",
		jdoodleVersionIndex: "6",
		monacoLanguage: "c",
		boilerplate:
			'#include <stdio.h>\n\nint main() {\n    printf("coding with C\\n");\n    return 0;\n}',
	},
	java: {
		value: "java",
		label: "Java",
		jdoodleVersionIndex: "5",
		monacoLanguage: "java",
		boilerplate:
			'public class Main {\n    public static void main(String[] args) {\n        System.out.println("coding with Java");\n    }\n}',
	},
	python3: {
		value: "python3",
		label: "Python",
		jdoodleVersionIndex: "5",
		monacoLanguage: "python",
		boilerplate: 'print("coding with Python")',
	},
	rust: {
		value: "rust",
		label: "Rust",
		jdoodleVersionIndex: "5",
		monacoLanguage: "rust",
		boilerplate: 'fn main() {\n    println!("coding with Rust");\n}',
	},
	go: {
		value: "go",
		label: "Go",
		jdoodleVersionIndex: "5",
		monacoLanguage: "go",
		boilerplate:
			'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("coding with Go")\n}',
	},
	nodejs: {
		value: "nodejs",
		label: "JavaScript",
		jdoodleVersionIndex: "6",
		monacoLanguage: "javascript",
		boilerplate: 'console.log("coding with JavaScript");',
	},
	typescript: {
		value: "typescript",
		label: "TypeScript",
		jdoodleVersionIndex: "0",
		monacoLanguage: "typescript",
		boilerplate: 'console.log("coding with TypeScript");',
	},
	csharp: {
		value: "csharp",
		label: "C#",
		jdoodleVersionIndex: "5",
		monacoLanguage: "csharp",
		boilerplate:
			'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("coding with C#");\n    }\n}',
	},
	elixir: {
		value: "elixir",
		label: "Elixir",
		jdoodleVersionIndex: "5",
		monacoLanguage: "elixir",
		boilerplate: 'IO.puts("coding with Elixir")',
	},
} as const;

export const editorOnlyLanguages = {
	html: { monacoLanguage: "html", boilerplate: "" },
	css: { monacoLanguage: "css", boilerplate: "" },
};

export const supportedLanguages = {
	...compilerLanguages,
	...editorOnlyLanguages,
};
