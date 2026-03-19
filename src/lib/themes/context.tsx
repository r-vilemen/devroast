"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	getCurrentSeason,
	getSeasonTheme,
	type Season,
	seasons,
} from "./seasons";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeConfig {
	mode: ThemeMode;
	season: Season;
}

export interface ThemeContextValue {
	config: ThemeConfig;
	setMode: (mode: ThemeMode) => void;
	setSeason: (season: Season) => void;
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		gradient?: { start: string; mid?: string; end: string };
	};
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [config, setConfig] = useState<ThemeConfig>({
		mode: "dark",
		season: getCurrentSeason(),
	});

	useEffect(() => {
		const stored = localStorage.getItem("theme-config");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setConfig((prev) => ({ ...prev, ...parsed }));
			} catch {
				// ignore invalid JSON
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme-config", JSON.stringify(config));

		const root = document.documentElement;
		const seasonTheme = getSeasonTheme(config.season);

		root.style.setProperty("--theme-primary", seasonTheme.colors.primary);
		root.style.setProperty("--theme-secondary", seasonTheme.colors.secondary);
		root.style.setProperty("--theme-accent", seasonTheme.colors.accent);

		if (seasonTheme.colors.gradient) {
			root.style.setProperty(
				"--theme-gradient-start",
				seasonTheme.colors.gradient.start,
			);
			root.style.setProperty(
				"--theme-gradient-mid",
				seasonTheme.colors.gradient.mid || "transparent",
			);
			root.style.setProperty(
				"--theme-gradient-end",
				seasonTheme.colors.gradient.end,
			);
		}

		const isDark =
			config.mode === "dark" ||
			(config.mode === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);

		root.classList.toggle("dark", isDark);
		root.classList.toggle("light", !isDark);
	}, [config]);

	const setMode = (mode: ThemeMode) => {
		setConfig((prev) => ({ ...prev, mode }));
	};

	const setSeason = (season: Season) => {
		setConfig((prev) => ({ ...prev, season }));
	};

	const seasonTheme = getSeasonTheme(config.season);

	return (
		<ThemeContext.Provider
			value={{
				config,
				setMode,
				setSeason,
				colors: seasonTheme.colors,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

export { getCurrentSeason, getSeasonTheme, seasons };
