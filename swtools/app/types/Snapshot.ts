type Snapshot = {
	player: string;
	uuid: string;
	stats: {
		skywars_experience: number;
		coins: number;
		opals: number;
		heads: number;
		souls: number;
		kills: number;
		deaths: number;
		wins: number;
		losses: number;
		time_played: number;
		wins_solo: number;
		losses_solo: number;
		kills_solo: number;
		deaths_solo: number;
		time_played_solo: number;
		wins_solo_normal: number;
		losses_solo_normal: number;
		kills_solo_normal: number;
		deaths_solo_normal: number;
		wins_solo_insane: number;
		losses_solo_insane: number;
		kills_solo_insane: number;
		deaths_solo_insane: number;
		wins_team: number;
		losses_team: number;
		kills_team: number;
		deaths_team: number;
		wins_team_normal: number;
		losses_team_normal: number;
		kills_team_normal: number;
		deaths_team_normal: number;
		wins_team_insane: number;
		losses_team_insane: number;
		kills_team_insane: number;
		deaths_team_insane: number;
		time_played_team: number;
		wins_mini: number;
		kills_mini: number;
		time_played_mini: number;
		games_mini: number;
		wins_lab: number;
		losses_lab: number;
		kills_lab: number;
		deaths_lab: number;
		time_played_lab: number;
	};
	statsVersion: number;
	queried: number;
};
type SnapshotsResponse = {
	[key: string]: Snapshot;
};

type SnapshotKeysResponse = {
	uuid: string;
	player: string;
	data: { queried: number; player: string }[];
	page?: number;
	pageSize?: number;
	total?: number;
	totalPages?: number;
};

export type { Snapshot, SnapshotsResponse, SnapshotKeysResponse };
