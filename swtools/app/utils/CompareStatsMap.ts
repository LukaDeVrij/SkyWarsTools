import { Snapshot } from "../types/Snapshot";
import { calcLevel } from "./Utils";

export type CompareStatsMap = {
	[key: string]: {
		label: string;
		hypixelKey?: string;
		format?: (stats: Snapshot["stats"]) => string;
		calculate?: (stats: Snapshot["stats"]) => number | undefined;
	};
};

export const compareMap: CompareStatsMap = {
	level: {
		label: "SkyWars Level",
		hypixelKey: undefined,
		format: undefined,
		calculate: (stats: Snapshot["stats"]) => calcLevel(stats.skywars_experience || 0),
	},
	skywars_experience: {
		label: "SkyWars Experience",
		hypixelKey: "skywars_experience",
		format: undefined,
	},
	coins: {
		label: "Coins",
		hypixelKey: "coins",
		format: undefined,
	},
	opals: {
		label: "Opals",
		hypixelKey: "opals",
		format: undefined,
	},
	heads: {
		label: "Heads",
		hypixelKey: "heads",
		format: undefined,
	},
	souls: {
		label: "Souls",
		hypixelKey: "souls",
		format: undefined,
	},
	wins: {
		label: "Wins",
		hypixelKey: "wins",
		format: undefined,
	},
	losses: {
		label: "Losses",
		hypixelKey: "losses",
		format: undefined,
	},
	wl: {
		label: "W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) => (stats.losses ? (stats.wins / stats.losses).toFixed(2) : "N/A"),
		calculate: (stats: Snapshot["stats"]) => (stats.losses ? stats.wins / stats.losses : undefined),
	},
	kills: {
		label: "Kills",
		hypixelKey: "kills",
		format: undefined,
	},
	deaths: {
		label: "Deaths",
		hypixelKey: "deaths",
		format: undefined,
	},
	kd: {
		label: "K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) => (stats.deaths ? (stats.kills / stats.deaths).toFixed(2) : "N/A"),
		calculate: (stats: Snapshot["stats"]) => (stats.deaths ? stats.kills / stats.deaths : undefined),
	},
	time_played: {
		label: "Time Played",
		hypixelKey: "time_played",
		format: undefined,
	},
	wins_solo: {
		label: "Solo Wins",
		hypixelKey: "wins_solo",
		format: undefined,
	},
	losses_solo: {
		label: "Solo Losses",
		hypixelKey: "losses_solo",
		format: undefined,
	},
	wl_solo: {
		label: "Solo W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) => (stats.losses_solo ? (stats.wins_solo / stats.losses_solo).toFixed(2) : "N/A"),
		calculate: (stats: Snapshot["stats"]) => (stats.losses_solo ? stats.wins_solo / stats.losses_solo : undefined),
	},
	kills_solo: {
		label: "Solo Kills",
		hypixelKey: "kills_solo",
		format: undefined,
	},
	deaths_solo: {
		label: "Solo Deaths",
		hypixelKey: "deaths_solo",
		format: undefined,
	},
	kd_solo: {
		label: "Solo K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) => (stats.deaths_solo ? (stats.kills_solo / stats.deaths_solo).toFixed(2) : "N/A"),
		calculate: (stats: Snapshot["stats"]) => (stats.deaths_solo ? stats.kills_solo / stats.deaths_solo : undefined),
	},

	time_played_solo: {
		label: "Solo Time Played",
		hypixelKey: "time_played_solo",
		format: undefined,
	},
	wins_solo_normal: {
		label: "Solo Normal Wins",
		hypixelKey: "wins_solo_normal",
		format: undefined,
	},
	losses_solo_normal: {
		label: "Solo Normal Losses",
		hypixelKey: "losses_solo_normal",
		format: undefined,
	},

	wl_solo_normal: {
		label: "Solo Normal W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.losses_solo_normal ? (stats.wins_solo_normal / stats.losses_solo_normal).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) => (stats.losses_solo_normal ? stats.wins_solo_normal / stats.losses_solo_normal : undefined),
	},
	kills_solo_normal: {
		label: "Solo Normal Kills",
		hypixelKey: "kills_solo_normal",
		format: undefined,
	},
	deaths_solo_normal: {
		label: "Solo Normal Deaths",
		hypixelKey: "deaths_solo_normal",
		format: undefined,
	},
	kd_solo_normal: {
		label: "Solo Normal K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.deaths_solo_normal ? (stats.kills_solo_normal / stats.deaths_solo_normal).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) =>
			stats.deaths_solo_normal ? stats.kills_solo_normal / stats.deaths_solo_normal : undefined,
	},
	wins_solo_insane: {
		label: "Solo Insane Wins",
		hypixelKey: "wins_solo_insane",
		format: undefined,
	},
	losses_solo_insane: {
		label: "Solo Insane Losses",
		hypixelKey: "losses_solo_insane",
		format: undefined,
	},

	wl_solo_insane: {
		label: "Solo Insane W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.losses_solo_insane ? (stats.wins_solo_insane / stats.losses_solo_insane).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) => (stats.losses_solo_insane ? stats.wins_solo_insane / stats.losses_solo_insane : undefined),
	},
	kills_solo_insane: {
		label: "Solo Insane Kills",
		hypixelKey: "kills_solo_insane",
		format: undefined,
	},
	deaths_solo_insane: {
		label: "Solo Insane Deaths",
		hypixelKey: "deaths_solo_insane",
		format: undefined,
	},
	kd_solo_insane: {
		label: "Solo Insane K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.deaths_solo_insane ? (stats.kills_solo_insane / stats.deaths_solo_insane).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) =>
			stats.deaths_solo_insane ? stats.kills_solo_insane / stats.deaths_solo_insane : undefined,
	},
	wins_team: {
		label: "Team Wins",
		hypixelKey: "wins_team",
		format: undefined,
	},
	losses_team: {
		label: "Team Losses",
		hypixelKey: "losses_team",
		format: undefined,
	},

	wl_team: {
		label: "Team W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) => (stats.losses_team ? (stats.wins_team / stats.losses_team).toFixed(2) : "N/A"),
		calculate: (stats: Snapshot["stats"]) => (stats.losses_team ? stats.wins_team / stats.losses_team : undefined),
	},
	kills_team: {
		label: "Team Kills",
		hypixelKey: "kills_team",
		format: undefined,
	},
	deaths_team: {
		label: "Team Deaths",
		hypixelKey: "deaths_team",
		format: undefined,
	},
	kd_team: {
		label: "Team K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) => (stats.deaths_team ? (stats.kills_team / stats.deaths_team).toFixed(2) : "N/A"),
		calculate: (stats: Snapshot["stats"]) => (stats.deaths_team ? stats.kills_team / stats.deaths_team : undefined),
	},
	time_played_team: {
		label: "Team Time Played",
		hypixelKey: "time_played_team",
		format: undefined,
	},
	wins_team_normal: {
		label: "Team Normal Wins",
		hypixelKey: "wins_team_normal",
		format: undefined,
	},
	losses_team_normal: {
		label: "Team Normal Losses",
		hypixelKey: "losses_team_normal",
		format: undefined,
	},
	wl_team_normal: {
		label: "Team Normal W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.losses_team_normal ? (stats.wins_team_normal / stats.losses_team_normal).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) => (stats.losses_team_normal ? stats.wins_team_normal / stats.losses_team_normal : undefined),
	},
	kills_team_normal: {
		label: "Team Normal Kills",
		hypixelKey: "kills_team_normal",
		format: undefined,
	},
	deaths_team_normal: {
		label: "Team Normal Deaths",
		hypixelKey: "deaths_team_normal",
		format: undefined,
	},
	kd_team_normal: {
		label: "Team Normal K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.deaths_team_normal ? (stats.kills_team_normal / stats.deaths_team_normal).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) =>
			stats.deaths_team_normal ? stats.kills_team_normal / stats.deaths_team_normal : undefined,
	},
	wins_team_insane: {
		label: "Team Insane Wins",
		hypixelKey: "wins_team_insane",
		format: undefined,
	},
	losses_team_insane: {
		label: "Team Insane Losses",
		hypixelKey: "losses_team_insane",
		format: undefined,
	},

	wl_team_insane: {
		label: "Team Insane W/L Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.losses_team_insane ? (stats.wins_team_insane / stats.losses_team_insane).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) => (stats.losses_team_insane ? stats.wins_team_insane / stats.losses_team_insane : undefined),
	},
	kills_team_insane: {
		label: "Team Insane Kills",
		hypixelKey: "kills_team_insane",
		format: undefined,
	},
	deaths_team_insane: {
		label: "Team Insane Deaths",
		hypixelKey: "deaths_team_insane",
		format: undefined,
	},
	kd_team_insane: {
		label: "Team Insane K/D Ratio",
		hypixelKey: undefined,
		format: (stats: Snapshot["stats"]) =>
			stats.deaths_team_insane ? (stats.kills_team_insane / stats.deaths_team_insane).toFixed(2) : "N/A",
		calculate: (stats: Snapshot["stats"]) =>
			stats.deaths_team_insane ? stats.kills_team_insane / stats.deaths_team_insane : undefined,
	},
	wins_mini: {
		label: "Mini Wins",
		hypixelKey: "wins_mini",
		format: undefined,
	},
	kills_mini: {
		label: "Mini Kills",
		hypixelKey: "kills_mini",
		format: undefined,
	},
	time_played_mini: {
		label: "Playtime Time Played",
		hypixelKey: "time_played_mini",
		format: undefined,
	},
	games_mini: {
		label: "Mini Games",
		hypixelKey: "games_mini",
		format: undefined,
	},
};

export function createCompareStatsMapFromSnapshot(snapshot: Snapshot): Record<string, number | string | undefined> {
	const result: Record<string, number | string | undefined> = {};

	for (const key in compareMap) {
		const entry = compareMap[key];
		if (entry.calculate) {
			result[key] = entry.calculate(snapshot.stats);
		} else if (entry.hypixelKey) {
			result[key] = snapshot.stats[entry.hypixelKey as keyof typeof snapshot.stats];
		} else {
			result[key] = undefined;
		}
	}

	return result;
}
