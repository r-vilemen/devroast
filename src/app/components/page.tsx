import { CodeBlockShowcase } from "@/components/code-block-showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { CodeBlockSkeleton } from "@/components/ui/code-block-skeleton";
import { CopyButton } from "@/components/ui/copy-button";
import {
	Dialog,
	DialogBackdrop,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DiffLine } from "@/components/ui/diff-line";
import { LanguagePicker } from "@/components/ui/language-picker";
import { Navbar } from "@/components/ui/navbar";
import { ScoreRing } from "@/components/ui/score-ring";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip } from "@/components/ui/tooltip";

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  return total;
}`;

export default function ComponentsPage() {
	return (
		<div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] p-8">
			<h1 className="font-mono text-3xl font-bold mb-8 text-[#10B981]">
				{"//"} components
			</h1>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} typography
				</h2>
				<div className="space-y-4 font-mono">
					<p className="text-4xl font-bold">paste your code. get roasted.</p>
					<p className="text-[#6B7280] text-sm">description text sample</p>
					<p className="text-[#737373] text-xs">lang: javascript · 7 lines</p>
					<p className="text-[#FFC799] text-sm">function calculateTotal()</p>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} buttons
				</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="primary">$ roast_my_code</Button>
					<Button variant="secondary">$ share_roast</Button>
					<Button variant="link">$ view_all &gt;&gt;</Button>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">{"//"} toggle</h2>
				<div className="flex items-center gap-8">
					<div className="flex items-center gap-3">
						<Toggle defaultChecked={true} />
						<span className="text-[#10B981] text-sm font-mono">roast mode</span>
					</div>
					<div className="flex items-center gap-3">
						<Toggle defaultChecked={false} />
						<span className="text-[#6B7280] text-sm font-mono">roast mode</span>
					</div>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} badge_status
				</h2>
				<div className="flex flex-wrap items-center gap-6">
					<Badge variant="critical">critical</Badge>
					<Badge variant="warning">warning</Badge>
					<Badge variant="good">good</Badge>
					<Badge variant="verdict" showDot={false}>
						needs_serious_help
					</Badge>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">{"//"} cards</h2>
				<Card variant="analysis">
					<CardHeader>
						<span className="h-2 w-2 rounded-full bg-[#EF4444]" />
						<span className="text-[#EF4444] text-xs font-mono">critical</span>
					</CardHeader>
					<div className="mt-3 space-y-2">
						<p className="font-mono text-sm text-[#FAFAFA]">
							using var instead of const/let
						</p>
						<p className="font-mono text-xs text-[#6B7280] leading-relaxed">
							the var keyword is function-scoped rather than block-scoped, which
							can lead to unexpected behavior and bugs. modern javascript uses
							const for immutable bindings and let for mutable ones.
						</p>
					</div>
				</Card>
			</section>

			<CodeBlockShowcase />

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} code_block_skeleton
				</h2>
				<div className="max-w-2xl">
					<CodeBlockSkeleton lineCount={8} />
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} copy_button
				</h2>
				<CopyButton code={sampleCode} />
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} language_picker
				</h2>
				<div className="flex flex-wrap gap-4">
					<LanguagePicker />
					<LanguagePicker value="typescript" />
					<LanguagePicker disabled />
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} tooltip
				</h2>
				<div className="flex gap-4">
					<Tooltip content="This is a helpful tooltip">
						<Button variant="secondary">Hover me</Button>
					</Tooltip>
					<Tooltip content="Copy to clipboard" side="bottom">
						<Button variant="secondary">Copy</Button>
					</Tooltip>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">{"//"} tabs</h2>
				<div className="max-w-2xl border border-[#2A2A2A] rounded-lg p-4">
					<Tabs
						items={[
							{
								value: "analysis",
								label: "Analysis",
								content: (
									<div className="space-y-2">
										<p className="text-[#A3A3A3] font-mono text-sm">
											Found 4 issues in this code
										</p>
									</div>
								),
							},
							{
								value: "suggestions",
								label: "Suggestions",
								content: (
									<div className="space-y-2">
										<p className="text-[#A3A3A3] font-mono text-sm">
											Consider using const instead of var
										</p>
									</div>
								),
							},
							{
								value: "diff",
								label: "Diff",
								content: (
									<div className="space-y-2">
										<p className="text-[#A3A3A3] font-mono text-sm">
											View suggested improvements
										</p>
									</div>
								),
							},
						]}
					/>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">{"//"} dialog</h2>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="secondary">Open Dialog</Button>
					</DialogTrigger>
				</Dialog>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} diff_line
				</h2>
				<div className="w-[560px] overflow-hidden rounded-md border border-[#2A2A2A]">
					<DiffLine type="removed">var total = 0;</DiffLine>
					<DiffLine type="added">const total = 0;</DiffLine>
					<DiffLine type="context">
						for (let i = 0; i &lt; items.length; i++) {"{"}
					</DiffLine>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} table_row
				</h2>
				<div className="w-[560px] border border-[#2A2A2A] rounded-md overflow-hidden">
					<TableRow>
						<TableCell variant="rank" className="text-[#737373]">
							#1
						</TableCell>
						<TableCell variant="score" className="text-[#EF4444] font-bold">
							2.1
						</TableCell>
						<TableCell
							variant="code"
							className="text-[#6B7280] text-xs truncate"
						>
							function calculateTotal(items) {"{"} var total = 0; ...
						</TableCell>
						<TableCell variant="lang" className="text-[#737373] text-xs">
							javascript
						</TableCell>
					</TableRow>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">{"//"} navbar</h2>
				<div className="w-[560px]">
					<Navbar />
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} score_ring
				</h2>
				<div className="flex gap-8">
					<ScoreRing value={3.5} max={10} size="md" />
					<ScoreRing value={7.2} max={10} size="md" />
					<ScoreRing value={9.8} max={10} size="md" />
				</div>
			</section>

			<section className="mb-12">
				<h2 className="font-mono text-xl mb-4 text-[#10B981]">
					{"//"} theme_system
				</h2>
				<p className="text-[#6B7280] text-sm mb-4 font-mono">
					Modular theme system with light/dark mode and seasonal themes
				</p>
				<ThemeSwitcher />
			</section>
		</div>
	);
}
