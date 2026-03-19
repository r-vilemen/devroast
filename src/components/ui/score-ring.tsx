"use client";

import { useId } from "react";
import { tv } from "tailwind-variants";

const scoreRing = tv({
	base: "relative inline-flex items-center justify-center",
	variants: {
		size: {
			sm: "h-24 w-24",
			md: "h-[180px] w-[180px]",
			lg: "h-48 w-48",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const scoreText = tv({
	base: "flex flex-col items-center justify-center",
});

const scoreValue = tv({
	base: "font-mono font-bold leading-none",
	variants: {
		size: {
			sm: "text-3xl",
			md: "text-5xl",
			lg: "text-7xl",
		},
	},
});

const scoreMax = tv({
	base: "font-mono leading-none",
	variants: {
		size: {
			sm: "text-xs text-[#737373]",
			md: "text-base text-[#737373]",
			lg: "text-xl text-[#737373]",
		},
	},
});

export interface ScoreRingProps {
	value: number;
	max?: number;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function ScoreRing({
	value,
	max = 10,
	size = "md",
	className,
}: ScoreRingProps) {
	const percentage = (value / max) * 100;
	const circumference = 2 * Math.PI * 80;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	const sizeConfig = {
		sm: { width: 96, strokeWidth: 4 },
		md: { width: 180, strokeWidth: 4 },
		lg: { width: 192, strokeWidth: 4 },
	};

	const config = sizeConfig[size];
	const gradientId = useId();

	return (
		<div className={scoreRing({ size, className })}>
			<svg
				width={config.width}
				height={config.width}
				viewBox="0 0 180 180"
				className="absolute inset-0 -rotate-90"
				role="img"
				aria-label={`Score: ${value} out of ${max}`}
			>
				<defs>
					<linearGradient
						id={gradientId}
						gradientUnits="userSpaceOnUse"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor="#10B981" />
						<stop offset="65%" stopColor="#F59E0B" />
						<stop offset="65.1%" stopColor="transparent" />
					</linearGradient>
				</defs>
				<circle
					cx="90"
					cy="90"
					r="80"
					fill="transparent"
					stroke="#2A2A2A"
					strokeWidth={config.strokeWidth}
				/>
				<circle
					cx="90"
					cy="90"
					r="80"
					fill="transparent"
					stroke={`url(#${gradientId})`}
					strokeWidth={config.strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
				/>
			</svg>
			<div className={scoreText({})}>
				<span className={scoreValue({ size })}>{value.toFixed(1)}</span>
				<span className={scoreMax({ size })}>/{max}</span>
			</div>
		</div>
	);
}
