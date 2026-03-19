import { tv } from "tailwind-variants";

const diffLine = tv({
	base: "flex items-center gap-2 px-4 py-2 font-mono text-sm",
	variants: {
		type: {
			removed: "bg-[#1A0A0A] text-[#A3A3A3]",
			added: "bg-[#0A1A0F] text-[#FAFAFA]",
			context: "text-[#A3A3A3]",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const prefix = tv({
	base: "font-mono font-normal w-4 text-center",
	variants: {
		type: {
			removed: "text-[#EF4444]",
			added: "text-[#10B981]",
			context: "text-[#737373]",
		},
	},
});

export interface DiffLineProps extends React.HTMLAttributes<HTMLDivElement> {
	type?: "removed" | "added" | "context";
}

export function DiffLine({
	className,
	type,
	children,
	...props
}: DiffLineProps) {
	return (
		<div className={diffLine({ type, className })} {...props}>
			<span className={prefix({ type })}>
				{type === "removed" ? "-" : type === "added" ? "+" : " "}
			</span>
			<span>{children}</span>
		</div>
	);
}

export { diffLine, prefix };
