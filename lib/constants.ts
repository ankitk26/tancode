// Shiki themes for Monaco Editor (dark and light variants)
export const shikiThemes = [
	// Vitesse
	{ value: "vitesse-dark", label: "Vitesse Dark" },
	{ value: "vitesse-light", label: "Vitesse Light" },
	// Rose Pine
	{ value: "rose-pine", label: "Rose Pine" },
	{ value: "rose-pine-dawn", label: "Rose Pine Dawn" },
	// Tokyo Night
	{ value: "tokyo-night", label: "Tokyo Night" },
	// GitHub
	{ value: "github-dark", label: "GitHub Dark" },
	{ value: "github-light", label: "GitHub Light" },
	// Vesper
	{ value: "vesper", label: "Vesper" },
	// Poimandres
	{ value: "poimandres", label: "Poimandres" },
	// Catppuccin
	{ value: "catppuccin-mocha", label: "Catppuccin Mocha" },
	{ value: "catppuccin-latte", label: "Catppuccin Latte" },
	// VS Code
	{ value: "dark-plus", label: "VS Code Dark+" },
	{ value: "light-plus", label: "VS Code Light+" },
	// Night Owl
	{ value: "night-owl", label: "Night Owl" },
	// One Dark
	{ value: "one-dark-pro", label: "One Dark Pro" },
];

// Valid theme values for validation
export const validThemeValues = shikiThemes.map((t) => t.value);

const fontsList = [
	{ value: "var(--font-jetbrains)", label: "JetBrains Mono" },
	{ value: "var(--font-geist)", label: "Geist Mono" },
	{ value: "var(--font-fira)", label: "Fira Code" },
	{ value: "var(--font-source)", label: "Source Code Pro" },
	{ value: "Lilex Variable", label: "Lilex" },
	{ value: "var(--font-courier)", label: "Courier Prime" },
	{ value: "monospace", label: "System Default" },
];
export const fonts = fontsList;

export const htmlPreview =
	'<h1 class="heading1">Heading tag</h1>\n<p>Paragraph tag</p>\n\n<ol id="list1">\n\t<li>Item1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>';

export const cssPreview =
	"html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}\n\nh1 {\n\tfont-family: serif\n}";

export const jsPreview =
	'const btn1 = document.querySelector(".btn");\nbtn1.addEventListener(\'click\', () => {\n\t  console.log("Buttonclicked");\n})';
