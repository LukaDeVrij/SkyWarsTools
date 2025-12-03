import { OverallResponse } from "@/app/types/OverallResponse";
import { Tooltip } from "@mui/material";
import { calcLevel, headsMap } from "@/app/utils/Utils";
import React from "react";
import Image from "next/image";
import { formatScheme } from "@/app/utils/Scheme";
import { getPlayerRank } from "@/app/utils/RankTag";
import MinecraftText from "@/app/utils/MinecraftText";

function VersusStatsCompare({ player1, player2 }: { player1: OverallResponse; player2: OverallResponse }) {
	// Calculation and comparison logic goes here

	const killsA = player1.stats.kills ?? 0;
	const killsB = player2.stats.kills ?? 0;
	const killsScoreA = (killsA / (killsA + killsB)) * 100;
	const killsScoreB = (killsB / (killsA + killsB)) * 100;

	const experienceA = player1.stats.skywars_experience ?? 0;
	const experienceB = player2.stats.skywars_experience ?? 0;
	const experienceScoreA = (experienceA / (experienceA + experienceB)) * 100;
	const experienceScoreB = (experienceB / (experienceA + experienceB)) * 100;

	const winsA = player1.stats.wins ?? 0;
	const winsB = player2.stats.wins ?? 0;
	const winsScoreA = (winsA / (winsA + winsB)) * 100;
	const winsScoreB = (winsB / (winsA + winsB)) * 100;

	const headsA = player1.stats.heads ?? 0;
	const headsB = player2.stats.heads ?? 0;
	const headsScoreA = (headsA / (headsA + headsB)) * 100;
	const headsScoreB = (headsB / (headsA + headsB)) * 100;

	let totalExpA = 0;
	let totalExpB = 0;
	headsMap.forEach((key) => {
		const kills1 = (player1.stats[key.key as keyof OverallResponse["stats"]] as number) ?? 0;
		totalExpA += kills1 * key.exp;
		const kills2 = (player2.stats[key.key as keyof OverallResponse["stats"]] as number) ?? 0;
		totalExpB += kills2 * key.exp;
	});
	const headsScoreExpA = (totalExpA / (totalExpA + totalExpB)) * 100;
	const headsScoreExpB = (totalExpB / (totalExpA + totalExpB)) * 100;

	const winLossRatioA = (player1.stats.wins ?? 0) / Math.max(player1.stats.losses ?? 1, 1);
	const winLossRatioB = (player2.stats.wins ?? 0) / Math.max(player2.stats.losses ?? 1, 1);
	const winLossRatioScoreA = (winLossRatioA / (winLossRatioA + winLossRatioB)) * 100;
	const winLossRatioScoreB = (winLossRatioB / (winLossRatioA + winLossRatioB)) * 100;

	const killDeathRatioA = (player1.stats.kills ?? 0) / Math.max(player1.stats.deaths ?? 1, 1);
	const killDeathRatioB = (player2.stats.kills ?? 0) / Math.max(player2.stats.deaths ?? 1, 1);
	const killDeathRatioScoreA = (killDeathRatioA / (killDeathRatioA + killDeathRatioB)) * 100;
	const killDeathRatioScoreB = (killDeathRatioB / (killDeathRatioA + killDeathRatioB)) * 100;

	const maxKitsA = player1.stats.kitsMaxPrestige ?? 0;
	const maxKitsB = player2.stats.kitsMaxPrestige ?? 0;
	const maxKitsScoreA = (maxKitsA / (maxKitsA + maxKitsB)) * 100;
	const maxKitsScoreB = (maxKitsB / (maxKitsA + maxKitsB)) * 100;

	const comparisons = [
		{
			label: "Experience",
			toFixed: 0,
			title: "SkyWars Experience",
			player1Value: experienceA,
			player2Value: experienceB,
			player1Score: experienceScoreA,
			player2Score: experienceScoreB,
		},
		{
			label: "Kills",
			toFixed: 0,
			title: "Total Kills",
			player1Value: killsA,
			player2Value: killsB,
			player1Score: killsScoreA,
			player2Score: killsScoreB,
		},
		{
			label: "Wins",
			toFixed: 0,
			title: "Total Wins",
			player1Value: winsA,
			player2Value: winsB,
			player1Score: winsScoreA,
			player2Score: winsScoreB,
		},
		{
			label: "Heads",
			toFixed: 0,
			title: "Total Heads Collected",
			player1Value: headsA,
			player2Value: headsB,
			player1Score: headsScoreA,
			player2Score: headsScoreB,
		},
		{
			label: "Heads EXP",
			toFixed: 0,
			title: "Total EXP from Heads",
			player1Value: totalExpA,
			player2Value: totalExpB,
			player1Score: headsScoreExpA,
			player2Score: headsScoreExpB,
		},
		{
			label: "W/L Ratio",
			toFixed: 3,
			title: "Win/Loss Ratio",
			player1Value: winLossRatioA,
			player2Value: winLossRatioB,
			player1Score: winLossRatioScoreA,
			player2Score: winLossRatioScoreB,
		},
		{
			label: "K/D Ratio",
			toFixed: 3,
			title: "Kill/Death Ratio",
			player1Value: killDeathRatioA,
			player2Value: killDeathRatioB,
			player1Score: killDeathRatioScoreA,
			player2Score: killDeathRatioScoreB,
		},
		{
			label: "Maxed Kits",
			toFixed: 0,
			title: "Kits at Max Prestige (7)",
			player1Value: maxKitsA,
			player2Value: maxKitsB,
			player1Score: maxKitsScoreA,
			player2Score: maxKitsScoreB,
		},
	];

	const finalScoreA = comparisons.reduce((acc, comp) => acc + comp.player1Score, 0);
	const finalScoreB = comparisons.reduce((acc, comp) => acc + comp.player2Score, 0);

	const winnerStats = finalScoreA > finalScoreB ? player1 : player2;
	const level = calcLevel(winnerStats.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, winnerStats, false);
	const rank = getPlayerRank(winnerStats);
	const playerTitle = `${scheme} ${rank.prefix} ${winnerStats.player}`;

	return (
		<>
			<div className="w-full lg:p-4">
				<table className="w-full text-base lg:text-2xl text-left bg-content rounded-lg">
					<thead className="text-accent">
						<tr className="table-row lg:hidden">
							{/* Mobile header row with avatars */}
							<th className="p-2 text-3xl w-[35%] truncate">
								<Image
									src={`https://www.mc-heads.net/avatar/${player1.player}`}
									width={40}
									height={40}
									className="rounded-sm"
									alt={player1.player + " avatar"}
								/>
							</th>
							<th className="w-[30%]"></th>
                            {/* TODO justify-end doesnt work?! */}
                            <th className="p-2 text-3xl w-[35%] truncate text-right">
                                {/* I am so confused */}
                                <span className="inline-block align-middle mr-2"></span>
                                <span className="inline-block align-middle">
                                    <Image
                                        src={`https://www.mc-heads.net/avatar/${player2.player}`}
                                        width={40}
                                        height={40}
                                        className="rounded-sm"
                                        alt={player2.player + " avatar"}
                                    />
                                    {/* GPT bs over */}
                                </span>
                            </th>
						</tr>
						<tr className="hidden lg:table-row">
							<th className="px-2 py-1 lg:p-2 lg:px-4 text-3xl w-[35%] truncate max-w-[1px]">{player1.player}</th>
							<th className="w-[30%]"></th>
							<th className="text-right px-2 py-1 lg:p-2 lg:px-4 text-3xl w-[35%] truncate max-w-[1px]">{player2.player}</th>
						</tr>
					</thead>
					<tbody className="border-t-2 border-[var(--accent)]">
						{comparisons.map((comp) => (
							<tr key={comp.label}>
								<td
									className={`px-2 py-1 lg:p-2 lg:px-4 w-[35%] truncate max-w-[1px] ${
										comp.player1Value > comp.player2Value
											? "text-green-400"
											: comp.player1Value < comp.player2Value
											? "text-red-400"
											: ""
									}`}
								>
									<Tooltip placement="left" title={comp.player1Score.toFixed(1) + " points"}>
										<span className="truncate max-w-full block">{comp.player1Value.toFixed(comp.toFixed)}</span>
									</Tooltip>
								</td>
								<td className="px-0 py-1 lg:p-2 lg:px-4 font-semibold text-center w-[30%] truncate max-w-[1px]">
									<Tooltip title={comp.title} placement="top">
										<span className="truncate max-w-full block">{comp.label}</span>
									</Tooltip>
								</td>
								<td
									className={`px-2 py-1 lg:p-2 lg:px-4 text-right w-[35%] truncate max-w-[1px] ${
										comp.player2Value > comp.player1Value
											? "text-green-400"
											: comp.player2Value < comp.player1Value
											? "text-red-400"
											: ""
									}`}
								>
									<Tooltip placement="right" title={comp.player2Score.toFixed(1) + " points"}>
										<span className="truncate max-w-full block">{comp.player2Value.toFixed(comp.toFixed)}</span>
									</Tooltip>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="w-full text-xl lg:ext-2xl bg-content rounded-lg p-4 mt-8 text-center gap-2 flex flex-col">
					<div className="flex flex-row justify-between">
						<span className={`font-semibold ${finalScoreA > finalScoreB ? "text-green-400" : "text-red-400"}`}>
							{finalScoreA.toFixed(2)}
						</span>
						<span>Winner</span>
						<span className={`font-semibold ${finalScoreB > finalScoreA ? "text-green-400" : "text-red-400"}`}>
							{finalScoreB.toFixed(2)}
						</span>
					</div>

					<div className="text-2xl lg:text-3xl">
						<MinecraftText>{playerTitle}</MinecraftText>
					</div>
				</div>
			</div>
		</>
	);
}

export default VersusStatsCompare;
