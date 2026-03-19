import { tv } from "tailwind-variants";
import { Button } from "./button";

const leaderboardContainer = tv({
	base: "w-full max-w-[960px]",
});

const leaderboardHeader = tv({
	base: "flex items-center justify-between w-full mb-1",
});

const titleRow = tv({
	base: "flex items-center gap-2",
});

const titleText = tv({
	base: "font-mono text-sm font-bold text-[#FAFAFA]",
});

const subtitle = tv({
	base: "font-mono text-xs text-[#525252] mt-1",
});

const tableContainer = tv({
	base: "border border-[#2A2A2A] rounded-lg overflow-hidden",
});

const tableHeader = tv({
	base: "flex items-center h-10 px-5 bg-[#171717] border-b border-[#2A2A2A]",
});

const tableHeaderCell = tv({
	base: "font-mono text-xs text-[#525252] font-medium",
	variants: {
		size: {
			sm: "w-12",
			md: "w-[70px]",
			lg: "flex-1",
			xl: "w-[100px]",
		},
	},
});

const tableRow = tv({
	base: "flex items-center px-5 py-4 border-b border-[#2A2A2A] last:border-b-0",
});

const rowRank = tv({
	base: "w-12 text-center font-mono text-sm",
	variants: {
		color: {
			gold: "text-[#F59E0B]",
			silver: "text-[#A3A3A3]",
			bronze: "text-[#A3A3A3]",
			default: "text-[#A3A3A3]",
		},
	},
});

const rowScore = tv({
	base: "w-[70px] text-center font-mono text-sm font-bold text-[#EF4444]",
});

const rowCode = tv({
	base: "flex-1 font-mono text-sm text-[#FAFAFA]",
});

const rowLang = tv({
	base: "w-[100px] text-[#737373] font-mono text-xs",
});

const codeLine = tv({
	base: "leading-5",
	variants: {
		type: {
			code: "text-[#FAFAFA]",
			comment: "text-[#8B8B8B]",
		},
	},
});

const fadeHint = tv({
	base: "flex justify-center pt-4 font-mono text-xs text-[#525252]",
});

interface LeaderboardEntry {
	rank: number;
	score: string;
	code: string[];
	lang: string;
}

interface LeaderboardPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	entries?: LeaderboardEntry[];
	showCount?: number;
	totalCount?: number;
}

function getRankColor(rank: number): "gold" | "silver" | "bronze" | "default" {
	switch (rank) {
		case 1:
			return "gold";
		case 2:
			return "silver";
		case 3:
			return "bronze";
		default:
			return "default";
	}
}

export function LeaderboardPreview({
	className,
	entries = defaultLeaderboard,
	showCount = 3,
	totalCount = 2847,
	...props
}: LeaderboardPreviewProps) {
	const visibleEntries = entries.slice(0, showCount);

	return (
		<div className={leaderboardContainer({ className })} {...props}>
			<div className={leaderboardHeader()}>
				<div>
					<div className={titleRow()}>
						<span className="font-mono text-sm font-bold text-[#10B981]">
							{/* */}
						</span>
						<span className={titleText()}>shame_leaderboard</span>
					</div>
					<p className={subtitle()}>
						{/* the worst code on the internet, ranked by shame */}
					</p>
				</div>
				<Button variant="link" size="sm">
					$ view_all &gt;&gt;
				</Button>
			</div>

			<div className={tableContainer()}>
				<div className={tableHeader()}>
					<span className={tableHeaderCell({ size: "sm" })}>#</span>
					<span className={tableHeaderCell({ size: "md" })}>score</span>
					<span className={tableHeaderCell({ size: "lg" })}>code</span>
					<span className={tableHeaderCell({ size: "xl" })}>lang</span>
				</div>

				{visibleEntries.map((entry) => (
					<div key={entry.rank} className={tableRow()}>
						<span className={rowRank({ color: getRankColor(entry.rank) })}>
							{entry.rank}
						</span>
						<span className={rowScore()}>{entry.score}</span>
						<div className={rowCode()}>
							{entry.code.map((line, idx) => (
								<p
									key={idx}
									className={codeLine({
										type: line.trim().startsWith("//") ? "comment" : "code",
									})}
								>
									{line}
								</p>
							))}
						</div>
						<span className={rowLang()}>{entry.lang}</span>
					</div>
				))}
			</div>

			<p className={fadeHint()}>
				showing top {showCount} of {totalCount.toLocaleString()} · view full
				leaderboard &gt;&gt;
			</p>
		</div>
	);
}

const defaultLeaderboard: LeaderboardEntry[] = [
	{
		rank: 1,
		score: "1.2",
		code: [
			"eval(prompt('enter code'))",
			"document.write(response)",
			"// trust the user lol",
		],
		lang: "javascript",
	},
	{
		rank: 2,
		score: "1.8",
		code: [
			"if (x == true) { return true; }",
			"else if (x == false) { return false; }",
			"else { return !false; }",
		],
		lang: "typescript",
	},
	{
		rank: 3,
		score: "2.1",
		code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
		lang: "sql",
	},
];
