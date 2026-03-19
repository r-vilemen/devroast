"use client";

import { Suspense } from "react";
import { CodeBlockSkeleton } from "./code-block-skeleton";
import {
	type HighlightedCodeBlockProps,
	HighlightedCodeBlock as ServerHighlightedCodeBlock,
} from "./highlighted-code-block";

export interface HighlightedCodeBlockClientProps
	extends Omit<HighlightedCodeBlockProps, "language"> {
	language?: HighlightedCodeBlockProps["language"];
}

export function HighlightedCodeBlock(props: HighlightedCodeBlockClientProps) {
	return (
		<Suspense fallback={<CodeBlockSkeleton lineCount={8} />}>
			<ServerHighlightedCodeBlock {...props} />
		</Suspense>
	);
}

export type { SupportedLanguage } from "./highlighted-code-block";
