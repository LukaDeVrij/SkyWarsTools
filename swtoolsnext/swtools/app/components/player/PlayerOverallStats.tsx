import React from "react";

import { calcLevel, calcLevelOld, formatPlaytime } from "@/app/utils/Utils";

interface PlayerOverallStatsProps {
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
		wins_team: number;
		losses_team: number;
		kills_team: number;
		deaths_team: number;
		time_played_team: number;
		wins_mini: number;
		kills_mini: number;
		time_played_mini: number;
	};
}

const PlayerOverallStats: React.FC<PlayerOverallStatsProps> = ({ stats }) => {
	return (
		<div className="w-full lg:w-[40%] h-72 bg-content font-[600] flex justify-center items-center">
			<table className="w-[90%] h-[90%] text-[var(--foreground)] text-lg text-left">
                <tbody>
                    <tr>
                        <td style={{ width: "50%" }}>Level</td>
                        <td>
                            <span>{calcLevel(stats.skywars_experience).toFixed(3)} </span>
                            <span className="text-accent">
                                ({calcLevelOld(stats.skywars_experience).toFixed(3)})
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>Wins</td>
                        <td>{stats.wins.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>Losses</td>
                        <td>{stats.losses.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>WLR</td>
                        <td>{stats.losses === 0 ? "∞" : (stats.wins / stats.losses).toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>Kills</td>
                        <td>{stats.kills.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>Deaths</td>
                        <td>{stats.deaths.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>KDR</td>
                        <td>{stats.deaths === 0 ? "∞" : (stats.kills / stats.deaths).toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>Heads</td>
                        <td>{stats.heads?.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "50%" }}>Playtime</td>
                        <td>
                            {formatPlaytime(stats.time_played)}
                        </td>
                    </tr>
                </tbody>
			</table>
		</div>
	);
};

export default PlayerOverallStats;
