import { tv } from "tailwind-variants";

const footerStats = tv({
	base: "flex items-center gap-6 font-mono text-sm text-[#525252]",
});

const statDot = tv({
	base: "text-[#525252]",
});

export interface FooterStatsProps extends React.HTMLAttributes<HTMLDivElement> {
	codesRoasted?: number;
	avgScore?: number;
}

export function FooterStats({
	className,
	codesRoasted = 2847,
	avgScore = 4.2,
	...props
}: FooterStatsProps) {
	return (
		<div className={footerStats({ className })} {...props}>
			<span>{codesRoasted.toLocaleString()} codes roasted</span>
			<span className={statDot()}>·</span>
			<span>avg score: {avgScore}/10</span>
		</div>
	);
}
