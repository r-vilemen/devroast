"use client";

import { tv } from "tailwind-variants";

const skeleton = tv({
	base: "bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden",
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const pulse = tv({
	base: "animate-pulse bg-[#2A2A2A] rounded",
});

const lineWidths = [
	"95%",
	"80%",
	"90%",
	"70%",
	"85%",
	"75%",
	"88%",
	"92%",
	"78%",
	"82%",
	"96%",
	"68%",
	"84%",
	"73%",
	"89%",
];

export interface CodeBlockSkeletonProps {
	lineCount?: number;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function CodeBlockSkeleton({
	lineCount = 10,
	size = "md",
	className,
}: CodeBlockSkeletonProps) {
	const lineHeights = {
		sm: "h-5",
		md: "h-6",
		lg: "h-7",
	};

	return (
		<div className={skeleton({ size, className })}>
			<div className="flex items-center h-10 px-4 border-b border-[#2A2A2A] bg-[#0F0F0F]">
				<div className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-full bg-[#EF4444]" />
					<span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
					<span className="w-3 h-3 rounded-full bg-[#10B981]" />
				</div>
				<span className="flex-1" />
				<span className={`${pulse({})} h-3 w-16`} />
			</div>

			<div className="flex p-4 gap-4">
				<div className="flex flex-col gap-2 shrink-0">
					{Array.from({ length: lineCount }).map((_, i) => (
						<span key={i} className={`${pulse({})} ${lineHeights[size]} w-6`} />
					))}
				</div>

				<div className="flex-1 flex flex-col gap-2">
					{Array.from({ length: lineCount }).map((_, i) => (
						<span
							key={i}
							className={`${pulse({})} ${lineHeights[size]}`}
							style={{
								width: lineWidths[i % lineWidths.length],
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
