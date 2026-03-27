const themesList = [
	{ value: "vs", label: "Light" },
	{ value: "vs-dark", label: "Dark" },
	{ value: "hc-black", label: "High Contrast Dark" },
	{ value: "hc-light", label: "High Contrast Light" },
];
export const themes = themesList;

const fontsList = [
	"Consolas",
	"Jetbrains Mono",
	"Cascadia Code",
	"Geist Mono",
	"Fira Code",
	"Menlo",
	"Courier",
	"Inconsolata",
];
export const fonts = fontsList.map((font) => ({ value: font, label: font }));

export const htmlPreview =
	'<h1 class="heading1">Heading tag</h1>\n<p>Paragraph tag</p>\n\n<ol id="list1">\n\t<li>Item1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>';

export const cssPreview =
	"html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}\n\nh1 {\n\tfont-family: serif\n}";

export const jsPreview =
	'const btn1 = document.querySelector(".btn");\nbtn1.addEventListener(\'click\', () => {\n\t  console.log("Buttonclicked");\n})';
