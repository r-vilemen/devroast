import { getSeasonTheme, type Season } from "./seasons";
import { baseTokens } from "./tokens";

export interface ThemeCSSVars {
	"--theme-primary": string;
	"--theme-secondary": string;
	"--theme-accent": string;
	"--theme-gradient-start"?: string;
	"--theme-gradient-mid"?: string;
	"--theme-gradient-end"?: string;
}

export function generateThemeCSS(_season: Season = "default"): string {
	const theme = getSeasonTheme(_season);
	const tokens = baseTokens;

	return `
:root {
	--theme-primary: ${theme.colors.primary};
	--theme-secondary: ${theme.colors.secondary};
	--theme-accent: ${theme.colors.accent};
	${
		theme.colors.gradient
			? `
	--theme-gradient-start: ${theme.colors.gradient.start};
	--theme-gradient-mid: ${theme.colors.gradient.mid || "transparent"};
	--theme-gradient-end: ${theme.colors.gradient.end};
	`
			: ""
	}

	/* Base colors */
	--color-background: ${tokens.colors.background.page};
	--color-foreground: ${tokens.colors.foreground.primary};
	--color-card: ${tokens.colors.card.DEFAULT};
	--color-card-foreground: ${tokens.colors.card.foreground};
	--color-popover: ${tokens.colors.popover.DEFAULT};
	--color-popover-foreground: ${tokens.colors.popover.foreground};
	--color-primary: ${tokens.colors.primary.DEFAULT};
	--color-primary-foreground: ${tokens.colors.primary.foreground};
	--color-secondary: ${tokens.colors.secondary.DEFAULT};
	--color-secondary-foreground: ${tokens.colors.secondary.foreground};
	--color-muted: ${tokens.colors.muted.DEFAULT};
	--color-muted-foreground: ${tokens.colors.muted.foreground};
	--color-accent: ${tokens.colors.accent.DEFAULT};
	--color-accent-foreground: ${tokens.colors.accent.foreground};
	--color-destructive: ${tokens.colors.destructive.DEFAULT};
	--color-destructive-foreground: ${tokens.colors.destructive.foreground};
	--color-border: ${tokens.colors.border.DEFAULT};
	--color-input: ${tokens.colors.input.DEFAULT};
	--color-ring: ${tokens.colors.ring.DEFAULT};

	/* Radius */
	--radius-sm: ${tokens.radius.sm};
	--radius-md: ${tokens.radius.md};
	--radius-lg: ${tokens.radius.lg};
	--radius-xl: ${tokens.radius.xl};
	--radius-m: ${tokens.radius.m};
	--radius-pill: ${tokens.radius.pill};

	/* Fonts */
	--font-primary: ${tokens.fonts.primary};
	--font-secondary: ${tokens.fonts.secondary};
}

.light {
	--color-background: #FFFFFF;
	--color-foreground: #111111;
	--color-card: #FFFFFF;
	--color-card-foreground: #111111;
	--color-popover: #FFFFFF;
	--color-popover-foreground: #111111;
	--color-primary: #FF8400;
	--color-primary-foreground: #111111;
	--color-secondary: #E7E8E5;
	--color-secondary-foreground: #111111;
	--color-muted: #F2F3F0;
	--color-muted-foreground: #666666;
	--color-accent: #F2F3F0;
	--color-accent-foreground: #111111;
	--color-destructive: #D93C15;
	--color-destructive-foreground: #FFFFFF;
	--color-border: #CBCCC9;
	--color-input: #CBCCC9;
	--color-ring: #10B981;
	--color-background-page: #F2F3F0;
	--color-foreground-primary: #111111;
	--color-foreground-secondary: #666666;
}
`.trim();
}

export * from "./context";
export * from "./seasons";
export { baseTokens } from "./tokens";
