// Shiki themes for Monaco Editor (sorted alphabetically by label)
export const shikiThemes = [
	{ value: "catppuccin-latte", label: "Catppuccin Latte" },
	{ value: "catppuccin-mocha", label: "Catppuccin Mocha" },
	{ value: "github-dark", label: "GitHub Dark" },
	{ value: "github-light", label: "GitHub Light" },
	{ value: "one-dark-pro", label: "One Dark Pro" },
	{ value: "one-light", label: "One Light" },
	{ value: "poimandres", label: "Poimandres" },
	{ value: "rose-pine", label: "Rose Pine" },
	{ value: "rose-pine-dawn", label: "Rose Pine Dawn" },
	{ value: "tokyo-night", label: "Tokyo Night" },
	{ value: "vesper", label: "Vesper" },
	{ value: "vitesse-dark", label: "Vitesse Dark" },
	{ value: "vitesse-light", label: "Vitesse Light" },
	{ value: "dark-plus", label: "VS Code Dark+" },
	{ value: "light-plus", label: "VS Code Light+" },
];

// Valid theme values for validation
export const validThemeValues = shikiThemes.map((t) => t.value);

// Fonts sorted alphabetically by label
const fontsList = [
	{ value: "var(--font-courier)", label: "Courier Prime" },
	{ value: "var(--font-fira)", label: "Fira Code" },
	{ value: "var(--font-geist)", label: "Geist Mono" },
	{ value: "var(--font-jetbrains)", label: "JetBrains Mono" },
	{ value: "Lilex Variable", label: "Lilex" },
	{ value: "var(--font-source)", label: "Source Code Pro" },
	{ value: "monospace", label: "System Default" },
];
export const fonts = fontsList;

export const htmlPreview =
	'<h1 class="heading1">Heading tag</h1>\n<p>Paragraph tag</p>\n\n<ol id="list1">\n\t<li>Item1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>';

export const cssPreview =
	"html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}\n\nh1 {\n\tfont-family: serif\n}";

export const jsPreview =
	'const btn1 = document.querySelector(".btn");\nbtn1.addEventListener(\'click\', () => {\n\t  console.log("Buttonclicked");\n})';
