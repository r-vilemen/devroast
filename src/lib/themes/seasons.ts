import { baseTokens } from "./tokens";

export type Season =
	| "default"
	| "christmas"
	| "newyear"
	| "june"
	| "easter"
	| "halloween"
	| "valentine";

export interface SeasonTheme {
	name: Season;
	displayName: string;
	startDate?: { month: number; day: number };
	endDate?: { month: number; day: number };
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		gradient?: {
			start: string;
			mid?: string;
			end: string;
		};
	};
}

export const seasons: Record<Season, SeasonTheme> = {
	default: {
		name: "default",
		displayName: "Default",
		colors: {
			primary: baseTokens.colors.colorAccents.green,
			secondary: baseTokens.colors.colorAccents.amber,
			accent: baseTokens.colors.primary.DEFAULT,
		},
	},
	christmas: {
		name: "christmas",
		displayName: "Christmas",
		startDate: { month: 12, day: 1 },
		endDate: { month: 12, day: 26 },
		colors: {
			primary: "#DC2626",
			secondary: "#15803D",
			accent: "#FDE047",
			gradient: {
				start: "#DC2626",
				mid: "#15803D",
				end: "#FDE047",
			},
		},
	},
	newyear: {
		name: "newyear",
		displayName: "New Year",
		startDate: { month: 1, day: 1 },
		endDate: { month: 1, day: 7 },
		colors: {
			primary: "#FFD700",
			secondary: "#C0C0C0",
			accent: "#4169E1",
			gradient: {
				start: "#FFD700",
				mid: "#C0C0C0",
				end: "#4169E1",
			},
		},
	},
	june: {
		name: "june",
		displayName: "São João",
		startDate: { month: 6, day: 13 },
		endDate: { month: 6, day: 30 },
		colors: {
			primary: "#F97316",
			secondary: "#EAB308",
			accent: "#DC2626",
			gradient: {
				start: "#F97316",
				mid: "#EAB308",
				end: "#DC2626",
			},
		},
	},
	easter: {
		name: "easter",
		displayName: "Easter",
		startDate: { month: 3, day: 15 },
		endDate: { month: 4, day: 21 },
		colors: {
			primary: "#FF69B4",
			secondary: "#98FB98",
			accent: "#87CEEB",
			gradient: {
				start: "#FF69B4",
				mid: "#98FB98",
				end: "#87CEEB",
			},
		},
	},
	halloween: {
		name: "halloween",
		displayName: "Halloween",
		startDate: { month: 10, day: 15 },
		endDate: { month: 11, day: 1 },
		colors: {
			primary: "#FF6B00",
			secondary: "#6B2D5C",
			accent: "#2D5C6B",
			gradient: {
				start: "#FF6B00",
				mid: "#6B2D5C",
				end: "#2D5C6B",
			},
		},
	},
	valentine: {
		name: "valentine",
		displayName: "Valentine",
		startDate: { month: 2, day: 1 },
		endDate: { month: 2, day: 14 },
		colors: {
			primary: "#E11D48",
			secondary: "#FB7185",
			accent: "#F9A8D4",
			gradient: {
				start: "#E11D48",
				mid: "#FB7185",
				end: "#F9A8D4",
			},
		},
	},
};

export function getCurrentSeason(): Season {
	const now = new Date();
	const month = now.getMonth() + 1;
	const day = now.getDate();

	for (const season of Object.values(seasons)) {
		if (!season.startDate || !season.endDate) continue;

		const start = season.startDate.month * 100 + season.startDate.day;
		const end = season.endDate.month * 100 + season.endDate.day;
		const current = month * 100 + day;

		if (current >= start && current <= end) {
			return season.name;
		}
	}

	return "default";
}

export function getSeasonTheme(season: Season): SeasonTheme {
	return seasons[season] || seasons.default;
}
