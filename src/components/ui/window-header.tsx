import { tv } from "tailwind-variants";

const windowHeader = tv({
	base: "flex items-center h-10 px-4 border-b border-[#2A2A2A] bg-[#0F0F0F]",
});

const windowDots = tv({
	base: "flex items-center gap-2",
});

export interface WindowHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
}

export function WindowHeader({
	className,
	title,
	...props
}: WindowHeaderProps) {
	return (
		<div className={windowHeader({ className })} {...props}>
			<div className={windowDots()}>
				<span className="w-3 h-3 rounded-full bg-[#EF4444]" />
				<span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
				<span className="w-3 h-3 rounded-full bg-[#10B981]" />
			</div>
			{title && (
				<span className="ml-4 text-[#737373] text-xs font-mono">{title}</span>
			)}
		</div>
	);
}
