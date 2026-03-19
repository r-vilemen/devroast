"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { CodeBlockSkeleton } from "./code-block-skeleton";
import type { SupportedLanguage } from "./highlighted-code-block";

export interface HighlightedCodeBlockClientProps {
	code: string;
	language?: SupportedLanguage | string;
	filename?: string;
	showLineNumbers?: boolean;
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
							<span key={`line-${i + 1}`} className="leading-6">
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

export function HighlightedCodeBlockClient({
	code,
	language = "javascript",
	filename,
	showLineNumbers = true,
}: HighlightedCodeBlockClientProps) {
	const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		async function highlight() {
			setIsLoading(true);
			try {
				const html = await codeToHtml(code, {
					lang: language,
					theme: "vesper",
				});
				if (!cancelled) {
					setHighlightedCode(html);
				}
			} catch {
				// Fallback to javascript if language fails
				try {
					const html = await codeToHtml(code, {
						lang: "javascript",
						theme: "vesper",
					});
					if (!cancelled) {
						setHighlightedCode(html);
					}
				} catch {
					// Ultimate fallback - plain text
					if (!cancelled) {
						setHighlightedCode(`<pre><code>${code}</code></pre>`);
					}
				}
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		}

		highlight();

		return () => {
			cancelled = true;
		};
	}, [code, language]);

	if (isLoading || highlightedCode === null) {
		const lineCount = code.split("\n").length;
		return <CodeBlockSkeleton lineCount={lineCount} />;
	}

	return (
		<CodeBlockContent
			highlightedCode={highlightedCode}
			code={code}
			langToUse={language}
			filename={filename}
			showLineNumbers={showLineNumbers}
		/>
	);
}
