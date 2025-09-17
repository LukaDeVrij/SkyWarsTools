import { timeAgo } from "@/app/utils/Utils";
import { Tooltip } from "@mui/material";
import React from "react";

interface CompareViewPageProps {
	params: Promise<{ playerName: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

type SnapshotsResponse = {
	[key: string]: Snapshot;
};
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
	};
	statsVersion: number;
	queried: number;
};
const statsKeys: (keyof Snapshot["stats"])[] = [
	"skywars_experience",
	"coins",
	"opals",
	"heads",
	"souls",
	"kills",
	"deaths",
	"wins",
	"losses",
	"time_played",
	"wins_solo",
	"losses_solo",
	"kills_solo",
	"deaths_solo",
	"time_played_solo",
	"wins_solo_normal",
	"losses_solo_normal",
	"kills_solo_normal",
	"deaths_solo_normal",
	"wins_solo_insane",
	"losses_solo_insane",
	"kills_solo_insane",
	"deaths_solo_insane",
	"wins_team",
	"losses_team",
	"kills_team",
	"deaths_team",
	"wins_team_normal",
	"losses_team_normal",
	"kills_team_normal",
	"deaths_team_normal",
	"wins_team_insane",
	"losses_team_insane",
	"kills_team_insane",
	"deaths_team_insane",
	"time_played_team",
	"wins_mini",
	"kills_mini",
	"time_played_mini",
	"games_mini",
];

const statsNames: Record<keyof Snapshot["stats"], string> = {
	skywars_experience: "SkyWars Experience",
	coins: "Coins",
	opals: "Opals",
	heads: "Heads",
	souls: "Souls",
	kills: "Kills",
	deaths: "Deaths",
	wins: "Wins",
	losses: "Losses",
	time_played: "Time Played",
	wins_solo: "Solo Wins",
	losses_solo: "Solo Losses",
	kills_solo: "Solo Kills",
	deaths_solo: "Solo Deaths",
	time_played_solo: "Solo Time Played",
	wins_solo_normal: "Solo Normal Wins",
	losses_solo_normal: "Solo Normal Losses",
	kills_solo_normal: "Solo Normal Kills",
	deaths_solo_normal: "Solo Normal Deaths",
	wins_solo_insane: "Solo Insane Wins",
	losses_solo_insane: "Solo Insane Losses",
	kills_solo_insane: "Solo Insane Kills",
	deaths_solo_insane: "Solo Insane Deaths",
	wins_team: "Team Wins",
	losses_team: "Team Losses",
	kills_team: "Team Kills",
	deaths_team: "Team Deaths",
	wins_team_normal: "Team Normal Wins",
	losses_team_normal: "Team Normal Losses",
	kills_team_normal: "Team Normal Kills",
	deaths_team_normal: "Team Normal Deaths",
	wins_team_insane: "Team Insane Wins",
	losses_team_insane: "Team Insane Losses",
	kills_team_insane: "Team Insane Kills",
	deaths_team_insane: "Team Insane Deaths",
	time_played_team: "Team Time Played",
	wins_mini: "Mini Wins",
	kills_mini: "Mini Kills",
	time_played_mini: "Mini Time Played",
	games_mini: "Mini Games",
};

const PlayerStatsLayout = async ({ searchParams, params }: CompareViewPageProps) => {
	const awaitedParams = await params;
	const awaitedSearchParams = searchParams ? await searchParams : undefined;
	const playerName = awaitedParams.playerName;
	const k = awaitedSearchParams ? awaitedSearchParams.k : undefined;

	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${playerName}&keys=${k}`, {
		method: "GET",
	});
	const data: SnapshotsResponse = await res.json();

	if (!data || Object.keys(data).length < 1) {
		return (
			<div className="bg-red-500 text-black font-bold p-2 rounded-xl flex flex-col">
				<span>Error: You need at least 1 snapshots!</span>
				<span className="text-[12px] text-red-900">
					If you went through the selector menu, something went wrong, please report (Click about)
				</span>
			</div>
		);
	}

	const snapshots = Object.values(data).sort((a, b) => a.queried - b.queried); // chronological order
	console.log(snapshots);

	const hasDifferentStatsVersion = snapshots.some((s, i, arr) => arr.some((other) => other.statsVersion !== s.statsVersion));
	const hasOldStatsVersion = snapshots.some((s) => s.statsVersion < 4); // Example threshold

	const formatDate = (timestamp: number) => {
		const options: Intl.DateTimeFormatOptions = {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(timestamp).toLocaleString(undefined, options);
	};

	const getDiff = (a: number, b: number) => a - b;

	const queriedDiffs = snapshots.map((snap, idx, arr) => (idx > 0 ? snap.queried - arr[idx - 1].queried : 0));

	const formatTimeDiff = (diff: number) => {
		const seconds = Math.floor((diff / 1000) % 60);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		let result = "";
		if (days > 0) result += `${days}d `;
		if (hours > 0) result += `${hours}h `;
		if (minutes > 0) result += `${minutes}m `;
		if (seconds > 0 || result === "") result += `${seconds}s`;

		return result.trim();
	};

	return (
		<div className="overflow-x-auto p-2 lg:p-4 bg-content">
			{hasDifferentStatsVersion && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
					<span className="w-fit">Warning: Snapshots have different stats versions!</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			{hasOldStatsVersion && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
					<span>Warning: Some snapshots are outdated.</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			<table className="w-full bg-layer rounded-b-lg overflow-hidden rounded-xl">
				<thead className="text-left text-accent border-b-2">
					<tr>
						<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">Stat</th>
						{snapshots.map((snap, idx) => (
							<React.Fragment key={snap.queried}>
								{idx > 0 && (
									<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
										<Tooltip title={formatTimeDiff(queriedDiffs[idx])}>
											<span>Delta</span>
										</Tooltip>
									</th>
								)}
								<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
									<Tooltip title={timeAgo(snap.queried / 1000)}>
										<span className="text-xs">{formatDate(snap.queried)}</span>
									</Tooltip>
								</th>
							</React.Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					{statsKeys.map((key) => (
						<tr key={key} className="border-b last:border-b-0">
							<td className="p-1 lg:py-2 lg:px-3 font-semibold text-l lg:text-xl">{statsNames[key]}</td>
							{snapshots.map((snap, idx) => (
								<React.Fragment key={snap.queried + key}>
									{idx > 0 && (
										<td className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
											{getDiff(snap.stats[key] ?? 0, snapshots[idx - 1].stats[key] ?? 0).toLocaleString()}
										</td>
									)}
									<td className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">{snap.stats[key]?.toLocaleString() ?? "-"}</td>
								</React.Fragment>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default PlayerStatsLayout;
