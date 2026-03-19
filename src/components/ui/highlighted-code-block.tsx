import { codeToHtml } from "shiki";

const supportedLanguages = [
	"javascript",
	"typescript",
	"python",
	"rust",
	"go",
	"java",
	"cpp",
	"c",
	"ruby",
	"php",
	"swift",
	"kotlin",
	"scala",
	"html",
	"css",
	"json",
	"yaml",
	"markdown",
	"bash",
	"shell",
	"sql",
	"graphql",
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export interface HighlightedCodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
}

const languageDetectionPatterns: Record<string, RegExp[]> = {
	typescript: [/\binterface\s+\w+/, /:\s*(string|number|boolean|any)\b/],
	python: [/\bdef\s+\w+\(/, /\bprint\s*\(/, /:\s*$/m],
	rust: [/\bfn\s+\w+/, /\blet\s+mut\b/, /->\s*\w+/],
	go: [/\bfunc\s+\w+/, /\bpackage\s+\w+/, /:=\s*/],
	java: [/\bpublic\s+(class|static|void)\b/, /\bSystem\.out\./],
	cpp: [/#include\s*</, /\bstd::\w+/, /\bcout\s*<</],
	c: [/#include\s*</, /\bprintf\s*\(/, /\bmalloc\s*\(/],
	ruby: [/\bdef\s+\w+/, /\bputs\s+/, /end\s*$/m],
	php: [/<\?php/, /\$\w+\s*=/],
	swift: [/\bfunc\s+\w+/, /\bvar\s+\w+\s*:/, /\blet\s+\w+\s*:/],
	kotlin: [/\bfun\s+\w+/, /\bval\s+\w+/, /\bvar\s+\w+/],
	scala: [/\bdef\s+\w+/, /\bval\s+\w+/, /\bobject\s+\w+/],
	html: [/<html/i, /<div/i, /<\w+[^>]*>/],
	css: [/{\s*[\w-]+\s*:/, /\.[\w-]+\s*{/, /#[\w-]+\s*{/],
	json: [/^\s*{/, /^\s*\[/, /"[\w-]+":\s/],
	yaml: [/^\s*[\w-]+:\s*$/m, /^\s*-\s+\w+/m],
	bash: [/^#!/, /\becho\s+/, /\$\w+/],
	shell: [/^#!/, /\becho\s+/, /\$\w+/],
	sql: [/\bSELECT\b/i, /\bFROM\b/i, /\bWHERE\b/i],
	graphql: [/\bquery\b/, /\bmutation\b/, /\bfragment\b/],
};

function detectLanguage(code: string): string {
	let bestMatch = "javascript";
	let highestScore = 0;

	for (const [lang, patterns] of Object.entries(languageDetectionPatterns)) {
		let score = 0;
		for (const pattern of patterns) {
			if (pattern.test(code)) {
				score++;
			}
		}
		if (score > highestScore) {
			highestScore = score;
			bestMatch = lang;
		}
	}

	return bestMatch;
}

interface CodeBlockContentProps {
	highlightedCode: string;
	code: string;
	langToUse: string;
	filename?: string;
	showLineNumbers?: boolean;
}

function CodeBlockContent({
	highlightedCode,
	code,
	langToUse,
	filename,
	showLineNumbers = true,
}: CodeBlockContentProps) {
	const lines = code.split("\n");
	const lineCount = lines.length;
	const lineNumberWidth = String(lineCount).length * 10 + 16;

	return (
		<div className="bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden font-mono text-sm">
			<div className="flex items-center h-10 px-4 border-b border-[#2A2A2A] bg-[#0F0F0F]">
				<div className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-full bg-[#EF4444]" />
					<span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
					<span className="w-3 h-3 rounded-full bg-[#10B981]" />
				</div>
				{filename && (
					<span className="ml-4 text-[#737373] text-xs">{filename}</span>
				)}
				<span className="flex-1" />
				<span className="text-[#737373] text-xs">{langToUse}</span>
			</div>

			<div className="flex">
				{showLineNumbers && (
					<div
						className="flex flex-col py-3 px-3 bg-[#0F0F0F] text-[#525252] text-right select-none border-r border-[#2A2A2A] shrink-0"
						style={{ minWidth: lineNumberWidth }}
					>
						{lines.map((_, i) => (
							<span key={i} className="leading-6">
								{i + 1}
							</span>
						))}
					</div>
				)}
				<div
					className="flex-1 overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-0 [&_code]:block"
					dangerouslySetInnerHTML={{ __html: highlightedCode }}
				/>
			</div>
		</div>
	);
}

export async function HighlightedCodeBlock({
	code,
	language: forcedLanguage,
	filename,
	showLineNumbers = true,
}: HighlightedCodeBlockProps) {
	const detectedLanguage = forcedLanguage || detectLanguage(code);

	const isSupported = supportedLanguages.includes(
		detectedLanguage as SupportedLanguage,
	);
	const langToUse = isSupported ? detectedLanguage : "javascript";

	try {
		const highlightedCode = await codeToHtml(code, {
			lang: langToUse,
			theme: "vesper",
		});

		return (
			<CodeBlockContent
				highlightedCode={highlightedCode}
				code={code}
				langToUse={langToUse}
				filename={filename}
				showLineNumbers={showLineNumbers}
			/>
		);
	} catch {
		const highlightedCode = await codeToHtml(code, {
			lang: "javascript",
			theme: "vesper",
		});

		return (
			<CodeBlockContent
				highlightedCode={highlightedCode}
				code={code}
				langToUse="javascript"
				filename={filename}
				showLineNumbers={showLineNumbers}
			/>
		);
	}
}

export { supportedLanguages };
