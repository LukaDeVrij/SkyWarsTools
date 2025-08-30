import ProgressBar, { ProgressBarMode } from "@/app/components/universal/ProgressBar";
import Title from "@/app/components/universal/Title";
import { OverallResponse } from "@/app/types/OverallResponse";
import { romanize } from "@/app/utils/Utils";
import React from "react";

const AngelProgress: React.FC<{ response: OverallResponse }> = ({ response }) => {
	const playerAod: number = response.stats.angel_of_death_level ?? 0;

	const aodMap = [
		{ level: "I", cost: 50000, total: 50000, chance: "1%" },
		{ level: "II", cost: 200000, total: 250000, chance: "2%" },
		{ level: "III", cost: 500000, total: 750000, chance: "3%" },
		{ level: "IV", cost: 1000000, total: 1750000, chance: "4%" },
		{ level: "V", cost: 2000000, total: 3750000, chance: "5%" },
		{ level: "VI", cost: 5000000, total: 8750000, chance: "6%" },
		{ level: "VII", cost: 10000000, total: 18750000, chance: "7%" },
		{ level: "VIII", cost: 15000000, total: 33750000, chance: "8%" },
		{ level: "IX", cost: 20000000, total: 53750000, chance: "9%" },
		{ level: "X", cost: 30000000, total: 83750000, chance: "10%" },
		{ level: "XI", cost: 50000000, total: 133750000, chance: "11%" },
		{ level: "XII", cost: 75000000, total: 208750000, chance: "12%" },
	];

	return (
		<div className="w-full h-auto bg-content rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
			<Title color="text-blue-400">Angel of Death Progress</Title>
			<div className="overflow-x-scroll w-full lg:overflow-x-auto">
				<table className="text-base w-full ">
					<thead>
						<tr className="text-lg text-accent border-b border-white">
							<th className="px-2 text-left">Lvl</th>
							<th className="px-2 text-left">Cost</th>
							<th className="px-2 text-left">Total</th>
							<th className="px-2 text-left">Chance</th>
						</tr>
					</thead>
					<tbody>
						{aodMap.map((row, idx) => (
							<tr key={row.level} className={idx === playerAod - 1 ? "text-green-500" : ""}>
								<td className="pl-4">{row.level}</td>
								<td className="px-2 text-yellow-400">{row.cost.toLocaleString()}</td>
								<td className="px-2 text-yellow-400">{row.total.toLocaleString()}</td>
								<td className="px-2">{row.chance}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<table className="text-lg w-full">
				<tbody>
					<tr>
						<td>Angel&apos;s Offering (+1%)</td>
						<td className={` ${response.stats.angels_offering ? "text-green-600" : ""}`}>
							{response.stats.angels_offering ? "Unlocked" : "Locked"}
						</td>
						<td></td>
					</tr>
					<tr>
						<td>Favour of the Angel (+1%)</td>
						<td className={` ${response.stats.packages.includes("favor_of_the_angel") ? "text-green-600" : ""}`}>
							{response.stats.packages.includes("favor_of_the_angel") ? "Unlocked" : "Locked"}
						</td>
						<td></td>
					</tr>
					<tr>
						<td>Total Corruption Chance</td>
						<td className="text-pink-500">
							{playerAod + (response.stats.angels_offering ?? 0) + (response.stats.packages.includes("favor_of_the_angel") ? 1 : 0)}%
						</td>
					</tr>
					{playerAod < 12 && (
						<tr>
							<td colSpan={2} className="">
								<span className="text-sm">Progress to Tier {romanize(playerAod + 1)}</span>
								<ProgressBar
									progress={response.stats.coins ?? 0}
									total={aodMap[playerAod].cost}
									bgColor="#424242"
									progressColor="#cc3320ff"
									decimals={0}
									mode={ProgressBarMode.PERCENTAGE_ONLY}
								/>
							</td>
						</tr>
					)}
					<tr>
						<td colSpan={2} className="pb-2">
							<span className="text-sm">Total Angel of Death Progress</span>
							<ProgressBar
								progress={
									playerAod === 0
										? 0 + (response.stats.coins ?? 0)
										: aodMap[playerAod - 1].total + (response.stats.coins ?? 0)
								}
								total={208750000} // Total cost for all levels of Angel of Death
								bgColor="#424242"
								progressColor="#cc3320ff"
								decimals={0}
								mode={ProgressBarMode.PERCENTAGE_ONLY}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default AngelProgress;
