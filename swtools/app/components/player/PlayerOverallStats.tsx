import React from "react";

import { calcLevel, calcLevelOld, formatPlaytime } from "@/app/utils/Utils";
import { OverallResponse } from "@/app/types/OverallResponse";

interface PlayerOverallStatsProps {
	response: OverallResponse;
}

const PlayerOverallStats: React.FC<PlayerOverallStatsProps> = ({ response }) => {
	const stats = response.stats;
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
						<td>{stats.wins?.toLocaleString()}</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Losses</td>
						<td>{stats.losses?.toLocaleString()}</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>WLR</td>
						<td>
							{stats.losses === 0 ? (
								"∞"
							) : (
								<span className={((stats.wins ?? 0) / (stats.losses ?? 0)) > 1 ? "text-green-600" : ""}>
									{((stats.wins ?? 0) / (stats.losses ?? 0)).toFixed(3)}
								</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Kills</td>
						<td>{stats.kills?.toLocaleString()}</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Deaths</td>
						<td>{stats.deaths?.toLocaleString()}</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>KDR</td>
						<td>
							{stats.deaths === 0 ? (
								"∞"
							) : (
								<span className={((stats.kills ?? 0) / (stats.deaths ?? 0)) > 5 ? "text-green-600" : ""}>
									{((stats.kills ?? 0) / (stats.deaths ?? 0)).toFixed(3)}
								</span>
							)}
						</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Heads</td>
						<td>{stats.heads?.toLocaleString()}</td>
					</tr>
					<tr>
						<td style={{ width: "50%" }}>Playtime</td>
						<td>{formatPlaytime(stats.time_played ?? 0)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PlayerOverallStats;
