export const baseTokens = {
	colors: {
		colorAccents: {
			green: "#10B981",
			amber: "#F59E0B",
			red: "#EF4444",
			cyan: "#06B6D4",
			orange: "#F97316",
		},
		neutral: {
			50: "#FAFAFA",
			100: "#F5F5F5",
			200: "#E5E5E5",
			300: "#D4D4D4",
			400: "#A3A3A3",
			500: "#737373",
			600: "#525252",
			700: "#404040",
			800: "#262626",
			900: "#171717",
			950: "#0A0A0A",
		},
		success: {
			DEFAULT: "#10B981",
			foreground: "#FFFFFF",
		},
		destructive: {
			DEFAULT: "#EF4444",
			foreground: "#FFFFFF",
		},
		warning: {
			DEFAULT: "#F59E0B",
			foreground: "#000000",
		},
		info: {
			DEFAULT: "#3B82F6",
			foreground: "#FFFFFF",
		},
		border: {
			DEFAULT: "#2A2A2A",
			primary: "#1F1F1F",
			secondary: "#252525",
		},
		input: {
			DEFAULT: "#2A2A2A",
		},
		ring: {
			DEFAULT: "#10B981",
		},
		background: {
			page: "#0C0C0C",
			surface: "#171717",
			elevated: "#1A1A1A",
			input: "#111111",
		},
		foreground: {
			primary: "#FAFAFA",
			secondary: "#A3A3A3",
			muted: "#737373",
			tertiary: "#525252",
		},
		card: {
			DEFAULT: "#1A1A1A",
			foreground: "#FFFFFF",
		},
		popover: {
			DEFAULT: "#1A1A1A",
			foreground: "#FFFFFF",
		},
		muted: {
			DEFAULT: "#2A2E2E",
			foreground: "#A3A3A3",
		},
		primary: {
			DEFAULT: "#FF8400",
			foreground: "#111111",
		},
		secondary: {
			DEFAULT: "#2E2E2E",
			foreground: "#FFFFFF",
		},
		accent: {
			DEFAULT: "#F2F3F0",
			foreground: "#111111",
		},
	},
	radius: {
		none: "0",
		sm: "0.25rem",
		md: "0.5rem",
		lg: "1rem",
		xl: "1.5rem",
		m: "1rem",
		pill: "9999px",
	},
	fonts: {
		primary: "JetBrains Mono, monospace",
		secondary: "IBM Plex Mono, monospace",
	},
} as const;

export type BaseTokens = typeof baseTokens;
