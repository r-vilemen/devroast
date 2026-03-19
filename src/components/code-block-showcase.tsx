"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import type { SupportedLanguage } from "@/components/ui/highlighted-code-block";
import { HighlightedCodeBlockClient } from "@/components/ui/highlighted-code-block-client";
import { LanguagePicker } from "@/components/ui/language-picker";

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  return total;
}`;

export function CodeBlockShowcase() {
	const [selectedLang, setSelectedLang] =
		useState<SupportedLanguage>("javascript");

	return (
		<section className="mb-12">
			<h2 className="font-mono text-xl mb-4 text-[#10B981]">
				{"//"} highlighted_code_block (Shiki)
			</h2>
			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<LanguagePicker
						value={selectedLang}
						onValueChange={setSelectedLang}
					/>
					<CopyButton code={sampleCode} />
				</div>
				<HighlightedCodeBlockClient
					code={sampleCode}
					language={selectedLang}
					filename="calculate.js"
				/>
			</div>
		</section>
	);
}
