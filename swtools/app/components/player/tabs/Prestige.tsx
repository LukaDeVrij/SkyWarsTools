import React from "react";
import MinecraftText from "@/app/utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { calcEXPFromLevel, calcLevel, calcNextPrestigeObj, calcPrestigeObj, calcPrestigeTag, PrestigeObject } from "@/app/utils/Utils";
import ProgressBar from "../../universal/ProgressBar";
import { formatScheme } from "@/app/utils/Scheme";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";
import { notFound } from "next/navigation";


const Prestige: React.FC<OverallResponse> = async (response) => {
	// hacky fix
	// TODO fucking bs bug cost me 2 hours - for some reason we need to refetch the data here, otherwise its undefined half the time??? some SSR bs
	// const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(response.player)}`, {
	// 	next: { revalidate: 300 },
	// });
	// // I mean its not that big a deal since its cached and all but still
	// if (!res.ok) {
	// 	console.log(res.statusText);
	// 	notFound();
	// }
	// const overallData = await res.json();
	// response = overallData;
	// // hacky fix over

	const rank = getPlayerRank(response);

	// Prestige calculations - lot of stuff
	const experience: number = response.stats.skywars_experience ?? 0;
	const currentLevel = Math.floor(calcLevel(experience));
	const [currentPrestigeObj, currentPrestige] = calcPrestigeObj(currentLevel);
	const currentPrestigeString = calcPrestigeTag(currentPrestige);
	const [nextPrestigeObj, nextPrestige]: [PrestigeObject, number] = calcNextPrestigeObj(currentLevel);
	const nextPrestigeString = formatScheme(nextPrestige, response, true);

	const expTotalNextPrestige = calcEXPFromLevel(nextPrestige);
	const expDiffNextPrestige = expTotalNextPrestige - experience;

	const playtime = response.stats.time_played || 0;
	const expPerHour = experience / (playtime / 60 / 60);

	const nextPrestigePlaytime = expDiffNextPrestige / expPerHour;
	const expCurPrestige = calcEXPFromLevel(currentPrestige);
	const expNextPrestige = calcEXPFromLevel(nextPrestige);
	const expDiffCurNext = expNextPrestige - expCurPrestige;

	const progressPercentage = ((experience - expCurPrestige) / expDiffCurNext) * 100;

	const totalWins = response.stats.wins || 0;
	const winsPerHour = playtime > 0 ? totalWins / (playtime / 60 / 60) : 0;
	const winsNeeded = winsPerHour > 0 ? Math.ceil(nextPrestigePlaytime * winsPerHour) : 0;

	const totalKills = response.stats.kills || 0;
	const killsPerHour = playtime > 0 ? totalKills / (playtime / 60 / 60) : 0;
	const killsNeeded = killsPerHour > 0 ? Math.ceil(nextPrestigePlaytime * killsPerHour) : 0;

	return (
		<TabContent>
			{/* First div is for mobile layout */}
			<div className="block lg:hidden w-full h-auto font-semibold bg-content">
				<div className="flex flex-col items-center gap-3">
					<span className="text-[5rem] font-semibold">
						{progressPercentage.toFixed(2)}
						<span className="text-xl">%</span>
					</span>
				</div>
				<div className="flex flex-col gap-3 rounded-xl my-4 w-full">
					<table className="text-lg font-semibold w-full mb-2">
						<tbody>
							<tr>
								<td className="pr-2 text-accent">Current Prestige</td>
								<td className="pr-2">{currentPrestigeObj.name}</td>
								<td>
									<MinecraftText>{currentPrestigeString}</MinecraftText>
								</td>
							</tr>
							<tr>
								<td className="pr-2 text-accent">Next Prestige</td>
								<td className="pr-2">{nextPrestigeObj.name}</td>
								<td>
									<MinecraftText>{nextPrestigeString}</MinecraftText>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="w-full flex flex-col gap-1">
						<div className="text-lg font-bold">
							XP Needed: <span className="text-pink-500">{expDiffNextPrestige.toLocaleString()}</span>
						</div>
						<div className="text-lg font-bold">
							XP/Hour: <span className="text-pink-500">{expPerHour ? expPerHour.toFixed(2) : "0"}</span>
						</div>
						<div className="text-lg font-bold">
							Playtime Needed:{" "}
							<span className="text-pink-500">{nextPrestigePlaytime > 0 ? nextPrestigePlaytime.toFixed(1) : "0"} Hours</span>
						</div>
					</div>
				</div>
				<div className="w-full h-2 rounded-xl bg-main my-2"></div>
				<div className="flex flex-col text-lg my-4 w-full">
					<table className="w-full">
						<tbody>
							<tr>
								<td>Estimated Wins Needed</td>
								<td className="text-right">{winsNeeded.toLocaleString()}</td>
							</tr>
							<tr>
								<td>Estimated Kills Needed</td>
								<td className="text-right">{killsNeeded.toLocaleString()}</td>
							</tr>
						</tbody>
					</table>
					<table className="w-full">
						<tbody>
							<tr>
								<td className="flex gap-2 items-center">
									Wins at <MinecraftText>{nextPrestigeString}</MinecraftText> ≈
								</td>
								<td className="text-right">{((response.stats.wins ?? 0) + winsNeeded).toLocaleString()}</td>
							</tr>
							<tr>
								<td className="flex gap-2 items-center">
									Kills at <MinecraftText>{nextPrestigeString}</MinecraftText> ≈
								</td>
								<td className="text-right">{((response.stats.kills ?? 0) + killsNeeded).toLocaleString()}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<ProgressBar progress={experience - expCurPrestige} total={expDiffCurNext} bgColor="darkorange" progressColor="magenta" />
			</div>
			{/* This is for desktop */}
			<div className="hidden lg:block w-full font-semibold text-xl bg-content">
				<div className="flex items-center justify-center gap-4">
					<span className="text-3xl font-semibold flex gap-3 items-center">
						<MinecraftText>{`${rank.prefix} ${response.player}`}</MinecraftText>
						is <span>{progressPercentage.toFixed(2)}%</span> towards <MinecraftText>{nextPrestigeString}</MinecraftText>
					</span>
				</div>
				<div className="flex flex-wrap justify-between rounded-xl my-4">
					<table className="text-2xl font-semibold w-[50%]">
						<tbody>
							<tr>
								<td className="pr-2 text-accent">Current Prestige</td>
								<td className="pr-2">{currentPrestigeObj.name}</td>
								<td>
									<MinecraftText>{currentPrestigeString}</MinecraftText>
								</td>
							</tr>
							<tr>
								<td className="pr-2 text-accent">Next Prestige</td>
								<td className="pr-2">{nextPrestigeObj.name}</td>
								<td>
									<MinecraftText>{nextPrestigeString}</MinecraftText>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="w-[40%]">
						<div className="text-lg font-bold">
							XP Needed: <span className="text-pink-500">{expDiffNextPrestige.toLocaleString()}</span>
						</div>
						<div className="text-lg font-bold">
							XP/Hour: <span className="text-pink-500">{expPerHour ? expPerHour.toFixed(2) : "0"}</span>
						</div>
						<div className="text-lg font-bold">
							Playtime Needed:{" "}
							<span className="text-pink-500">{nextPrestigePlaytime > 0 ? nextPrestigePlaytime.toFixed(1) : "0"} Hours</span>
						</div>
					</div>
				</div>
				<div className="w-full h-2 rounded-xl bg-main"></div>
				<div className="flex flex-wrap gap-2 justify-between text-xl my-6">
					<table className="w-[50%]">
						<tbody>
							<tr>
								<td>Estimated Wins Needed</td>
								<td>{winsNeeded.toLocaleString()}</td>
							</tr>
							<tr>
								<td>Estimated Kills Needed</td>
								<td>{killsNeeded.toLocaleString()}</td>
							</tr>
						</tbody>
					</table>
					<table className="w-[40%]">
						<tbody>
							<tr>
								<td className="flex gap-3">
									Wins at <MinecraftText>{nextPrestigeString}</MinecraftText> ≈
								</td>
								<td>{((response.stats.wins ?? 0) + winsNeeded).toLocaleString()}</td>
							</tr>
							<tr>
								<td className="flex gap-3">
									Kills at <MinecraftText>{nextPrestigeString}</MinecraftText> ≈
								</td>
								<td>{((response.stats.kills ?? 0) + killsNeeded).toLocaleString()}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<ProgressBar progress={experience - expCurPrestige} total={expDiffCurNext} bgColor="darkorange" progressColor="magenta" />
			</div>
		</TabContent>
	);
};

export default Prestige;
