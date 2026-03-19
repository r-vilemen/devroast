"use client";

import { type Season, seasons, useTheme } from "@/lib/themes";
import { Button } from "./button";

export function ThemeSwitcher() {
	const { config, setMode, setSeason } = useTheme();

	return (
		<div className="flex flex-col gap-4 p-4 bg-[#171717] rounded-lg border border-[#2A2A2A]">
			<div>
				<p className="text-xs text-[#737373] font-mono mb-2">MODE</p>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant={config.mode === "light" ? "primary" : "secondary"}
						onClick={() => setMode("light")}
					>
						Light
					</Button>
					<Button
						size="sm"
						variant={config.mode === "dark" ? "primary" : "secondary"}
						onClick={() => setMode("dark")}
					>
						Dark
					</Button>
					<Button
						size="sm"
						variant={config.mode === "system" ? "primary" : "secondary"}
						onClick={() => setMode("system")}
					>
						System
					</Button>
				</div>
			</div>

			<div>
				<p className="text-xs text-[#737373] font-mono mb-2">SEASON</p>
				<div className="flex flex-wrap gap-2">
					{(Object.keys(seasons) as Season[]).map((season) => (
						<Button
							key={season}
							size="sm"
							variant={config.season === season ? "primary" : "secondary"}
							onClick={() => setSeason(season)}
						>
							{seasons[season].displayName}
						</Button>
					))}
				</div>
			</div>

			<div>
				<p className="text-xs text-[#737373] font-mono mb-2">CURRENT COLORS</p>
				<div className="flex gap-2">
					<div
						className="w-8 h-8 rounded border border-[#2A2A2A]"
						style={{ backgroundColor: "var(--theme-primary)" }}
						title="Primary"
					/>
					<div
						className="w-8 h-8 rounded border border-[#2A2A2A]"
						style={{ backgroundColor: "var(--theme-secondary)" }}
						title="Secondary"
					/>
					<div
						className="w-8 h-8 rounded border border-[#2A2A2A]"
						style={{ backgroundColor: "var(--theme-accent)" }}
						title="Accent"
					/>
				</div>
			</div>
		</div>
	);
}
