import React from "react";

import { calcLevel, calcLevelOld, formatPlaytime } from "@/app/utils/Utils";
import { OverallResponse } from "@/app/types/OverallResponse";

interface PlayerOverallStatsProps {
	response: OverallResponse;
}
type RanksResponse = {
	success: boolean;
	uuid: string;
	ranks: {
		kills: number;
		deaths: number;
		wins: number;
		losses: number;
		heads: number;
		time_played: number;
	};
};

const PlayerOverallStats: React.FC<PlayerOverallStatsProps> = async ({ response }) => {
	const stats = response.stats;

	let data: RanksResponse | undefined = undefined;

	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRanks?uuid=${encodeURIComponent(response.uuid)}`);
	if (res.ok) data = await res.json();

	return (
		<div className="w-full lg:w-[40%] h-72 bg-content  font-[600] flex justify-center items-center">
			<table className="w-[90%] h-[90%] text-[var(--foreground)] text-lg text-left">
				<tbody>
					<tr>
						<td style={{ width: "50%" }}>Level</td>
						<td>
							<span>{calcLevel(stats.skywars_experience ?? 0).toFixed(3)} </span>
							<span className="text-accent">({calcLevelOld(stats.skywars_experience ?? 0).toFixed(3)})</span>
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Wins</td>
						<td>
							<span>{stats.wins?.toLocaleString()}</span>
							{data?.ranks && data.ranks.wins !== undefined && (
								<span className="text-accent"> (#{data.ranks.wins ?? "?"})</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Losses</td>
						<td>
							<span>{stats.losses?.toLocaleString()}</span>
							{data?.ranks && data.ranks.losses !== undefined && (
								<span className="text-accent"> (#{data.ranks.losses ?? "?"})</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>WLR</td>
						<td>
							{stats.losses === 0 ? (
								"∞"
							) : (
								<>
									<span className={(stats.wins ?? 0) / (stats.losses ?? 0) > 1 ? "text-green-600" : ""}>
										{((stats.wins ?? 0) / (stats.losses ?? 0)).toFixed(3)}
									</span>
									<span className="text-accent">
										{" "}
										({(((stats.wins ?? 0) / ((stats.wins ?? 0) + (stats.losses ?? 0))) * 100).toFixed(2)}%)
									</span>
								</>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Kills</td>
						<td>
							<span>{stats.kills?.toLocaleString()}</span>
							{data?.ranks && data.ranks.kills !== undefined && (
								<span className="text-accent"> (#{data.ranks.kills ?? "?"})</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Deaths</td>
						<td>
							<span>{stats.deaths?.toLocaleString()}</span>
							{data?.ranks && data.ranks.deaths !== undefined && (
								<span className="text-accent"> (#{data.ranks.deaths ?? "?"})</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>KDR</td>
						<td>
							{stats.deaths === 0 ? (
								"∞"
							) : (
								<span className={(stats.kills ?? 0) / (stats.deaths ?? 0) > 5 ? "text-green-600" : ""}>
									{((stats.kills ?? 0) / (stats.deaths ?? 0)).toFixed(3)}
								</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Heads</td>
						<td>
							<span>{stats.heads?.toLocaleString()}</span>
							{data?.ranks && data.ranks.heads !== undefined && (
								<span className="text-accent"> (#{data.ranks.heads ?? "?"})</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Playtime</td>
						<td>
							<span>{formatPlaytime(stats.time_played ?? 0)}</span>
							{data?.ranks && data.ranks.time_played !== undefined && (
								<span className="text-accent"> (#{data.ranks.time_played ?? "?"})</span>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PlayerOverallStats;
