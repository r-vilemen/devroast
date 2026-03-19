import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
	base: "inline-flex items-center gap-2 font-mono text-xs font-normal",
	variants: {
		variant: {
			critical: "text-[#EF4444]",
			warning: "text-[#F59E0B]",
			good: "text-[#10B981]",
			verdict: "text-[#EF4444]",
		},
	},
	defaultVariants: {
		variant: "good",
	},
});

const dot = tv({
	base: "rounded-full",
	variants: {
		variant: {
			critical: "bg-[#EF4444]",
			warning: "bg-[#F59E0B]",
			good: "bg-[#10B981]",
			verdict: "bg-[#EF4444]",
		},
		size: {
			sm: "h-2 w-2",
			md: "h-2.5 w-2.5",
		},
	},
	defaultVariants: {
		variant: "good",
		size: "md",
	},
});

export interface BadgeProps extends VariantProps<typeof badge> {
	className?: string;
	children: React.ReactNode;
	showDot?: boolean;
	dotSize?: VariantProps<typeof dot>["size"];
}

export function Badge({
	className,
	variant,
	children,
	showDot = true,
	dotSize = "md",
}: BadgeProps) {
	return (
		<span className={badge({ variant, className })}>
			{showDot && <span className={dot({ variant, size: dotSize })} />}
			{children}
		</span>
	);
}

export { badge, dot };
