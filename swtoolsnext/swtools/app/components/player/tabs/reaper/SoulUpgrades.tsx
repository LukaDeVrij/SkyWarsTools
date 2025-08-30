import HoverableSpan from "@/app/components/universal/HoverableSpan";
import Title from "@/app/components/universal/Title";
import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";

const SoulUpgrades: React.FC<{ response: OverallResponse }> = ({ response }) => {
	return (
		<div className="w-full h-auto bg-content rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
			<Title color="text-blue-400">Angel&apos;s Descent Soul Upgrades</Title>
			<table className="text-lg w-full">
				<tbody>
					<tr>
						<td>
							<HoverableSpan hoverText={"Gain Souls for wins"}>Grand Slam</HoverableSpan>
						</td>
						<td className={`pr-4 ${response.stats.grand_slam == 3 ? "text-green-600" : ""}`}>{response.stats.grand_slam}/3</td>
						<td>+{2 * (response.stats.grand_slam ?? 0)}</td>
					</tr>
					<tr>
						<td>
							<HoverableSpan hoverText={"Earn souls at the end of the game"}>Soul Seeker</HoverableSpan>
						</td>
						<td className={`pr-4 ${response.stats.shard_seeker == 5 ? "text-green-600" : ""}`}>
							{response.stats.shard_seeker}/5
						</td>
						<td>+{2 * (response.stats.shard_seeker ?? 0)}%</td>
					</tr>
					<tr>
						<td>
							<HoverableSpan hoverText="Wins grant additional souls">Xezbeth Luck</HoverableSpan>
						</td>
						<td className={`pr-4 ${response.stats.xezbeth_luck == 2 ? "text-green-600" : ""}`}>
							{(response.stats.xezbeth_luck ?? 0) + 1}/3
						</td>
						<td>+{(response.stats.xezbeth_luck ?? 0) + 1}</td>
					</tr>
					<tr>
						<td>
							<HoverableSpan hoverText="Grants a chance to earn x2 Souls from a kill or win">
								Harvesting Season
							</HoverableSpan>
						</td>
						<td className={`pr-4 ${response.stats.harvesting_season == 4 ? "text-green-600" : ""}`}>
							{(response.stats.harvesting_season ?? 0) + 1}/5
						</td>
						<td>{((response.stats.harvesting_season ?? 0) + 1) * 2}%</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SoulUpgrades;
