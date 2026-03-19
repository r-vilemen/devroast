"use client";

import { useState } from "react";
import {
	type SupportedLanguage,
	supportedLanguages,
} from "./highlighted-code-block";

const languageLabels: Record<SupportedLanguage, string> = {
	javascript: "JavaScript",
	typescript: "TypeScript",
	python: "Python",
	rust: "Rust",
	go: "Go",
	java: "Java",
	cpp: "C++",
	c: "C",
	ruby: "Ruby",
	php: "PHP",
	swift: "Swift",
	kotlin: "Kotlin",
	scala: "Scala",
	html: "HTML",
	css: "CSS",
	json: "JSON",
	yaml: "YAML",
	markdown: "Markdown",
	bash: "Bash",
	shell: "Shell",
	sql: "SQL",
	graphql: "GraphQL",
};

export interface LanguagePickerProps {
	value?: SupportedLanguage;
	onValueChange?: (value: SupportedLanguage) => void;
	disabled?: boolean;
	className?: string;
}

export function LanguagePicker({
	value,
	onValueChange,
	disabled = false,
	className,
}: LanguagePickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	const selectedLabel = value ? languageLabels[value] : "Select language";

	const handleSelect = (lang: SupportedLanguage) => {
		onValueChange?.(lang);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				className={`flex items-center gap-2 h-8 px-3 bg-[#2A2A2A] border border-[#2A2A2A] text-[#A3A3A3] text-xs font-mono rounded-md hover:bg-[#3A3A3A] hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
				disabled={disabled}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label="Select programming language"
			>
				<span className={!value ? "text-[#737373]" : ""}>{selectedLabel}</span>
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
					aria-hidden="true"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</button>

			{isOpen && (
				<>
					<button
						type="button"
						className="fixed inset-0 z-40 cursor-default"
						onClick={() => setIsOpen(false)}
						aria-label="Close dropdown"
					/>
					<div
						className="absolute top-full left-0 mt-1 z-50 bg-[#171717] border border-[#2A2A2A] rounded-lg shadow-xl overflow-hidden min-w-[160px] animate-in fade-in zoom-in-95 duration-200"
						role="listbox"
						aria-label="Programming languages"
					>
						<div className="max-h-64 overflow-y-auto py-1">
							{supportedLanguages.map((lang) => (
								<button
									key={lang}
									type="button"
									onClick={() => handleSelect(lang)}
									className="relative flex items-center gap-2 w-full px-3 py-2 text-sm font-mono text-[#A3A3A3] cursor-pointer select-none outline-none hover:bg-[#2A2A2A] transition-colors"
								>
									{value === lang && (
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											className="absolute left-2"
											aria-hidden="true"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									)}
									<span
										className={value === lang ? "pl-5 text-[#10B981]" : "pl-0"}
									>
										{languageLabels[lang]}
									</span>
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
