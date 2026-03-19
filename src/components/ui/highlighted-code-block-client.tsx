"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CodeBlockSkeleton } from "./code-block-skeleton";
import type {
	HighlightedCodeBlockProps,
	SupportedLanguage,
} from "./highlighted-code-block";

const ServerHighlightedCodeBlock = dynamic(
	() =>
		import("./highlighted-code-block").then((mod) => mod.HighlightedCodeBlock),
	{
		ssr: false,
		loading: () => <CodeBlockSkeleton lineCount={8} />,
	},
);

export interface HighlightedCodeBlockClientProps
	extends Omit<HighlightedCodeBlockProps, "language"> {
	language?: HighlightedCodeBlockProps["language"];
}

export function HighlightedCodeBlock(props: HighlightedCodeBlockClientProps) {
	return <ServerHighlightedCodeBlock {...props} />;
}

export type { SupportedLanguage };
