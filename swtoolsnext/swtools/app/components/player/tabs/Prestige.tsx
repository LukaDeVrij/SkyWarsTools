import React from "react";
import MinecraftText from "@/app/components/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import {
	calcEXPFromLevel,
	calcLevel,
	calcNextPrestigeObj,
	calcPrestigeObj,
	calcPrestigeTag,
	PrestigeObject,
} from "@/app/utils/Utils";

interface PrestigeProps {
	display: {
		levelFormattedWithBrackets: string;
		levelFormatted: string;
		newPackageRank: string;
		monthlyPackageRank: string;
		rankPlusColor: string;
		monthlyRankColor: string;
		skywarsActiveScheme: string;
		tagColor?: string;
		tag?: string;
	};
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
	player: string;
}
const Prestige: React.FC<PrestigeProps> = ({ display, stats, player }) => {
	const rank = getPlayerRank(display);

	// Prestige calculations - lot of stuff
	const experience = stats.skywars_experience;
	const currentLevel = Math.floor(calcLevel(experience));
	const [currentPrestigeObj, currentPrestige] = calcPrestigeObj(currentLevel);
	const currentPrestigeString = calcPrestigeTag(currentPrestige);
	const [nextPrestigeObj, nextPrestige]: [PrestigeObject, number] = calcNextPrestigeObj(currentLevel);
	const nextPrestigeString = calcPrestigeTag(nextPrestige);

	const expTotalNextPrestige = calcEXPFromLevel(nextPrestige);
	const expDiffNextPrestige = expTotalNextPrestige - experience;

	const playtime = stats.time_played || 0;
	const expPerHour = experience / (playtime / 60 / 60);

	const nextPrestigePlaytime = expDiffNextPrestige / expPerHour;
	const expCurPrestige = calcEXPFromLevel(currentPrestige);
	const expNextPrestige = calcEXPFromLevel(nextPrestige);
	const expDiffCurNext = expNextPrestige - expCurPrestige;

	const progressPercentage = ((experience - expCurPrestige) / expDiffCurNext) * 100;

	return (
		<div className="p-4 w-full h-120 font-semibold text-2xl lg:text-3xl">
			<div className="flex gap-4 flex-nowrap justify-center items-center flex-row w-full">
				<MinecraftText>{currentPrestigeString}</MinecraftText>
				<span className="text-[60px]">
					{progressPercentage.toFixed(2)}
					<span className="text-[18px]">%</span>
				</span>
				<MinecraftText>{nextPrestigeString}</MinecraftText>
			</div>
			<table className="w-full text-base">
				<tbody>
					<tr className="text-center">
						<td className="text-left">Current Prestige</td>
						<td className="text-right">Next Prestige</td>
					</tr>
					<tr className="text-center">
						<td className="text-left">{currentPrestigeObj.name}</td>
						<td className="text-right">{nextPrestigeObj.name}</td>
					</tr>
				</tbody>
			</table>
			<div className="">
				<span></span>
			</div>
		</div>
	);
};

export default Prestige;
