"use client";
// Have to use client for Tabs to work properly - this also means everything else is client side -
// TODO - consider if this is the best approach for performance
// If we want to use server components, we must use URL params I think (does this work with fetching? - Ideally we dont want to fetch all data again)
import React, { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DescentGUI from "./reaper/DescentGUI";
import { calculateCraftableOpals, calculateOpalProgress, calculateOpalsSpent, combineDescentData, romanize } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import { DescentMap } from "@/app/types/DescentMap";
import ProgressBar from "../../universal/ProgressBar";
import { ProgressBarMode } from "../../universal/ProgressBar";

const GrimReaper: React.FC<APIResponse> = (response) => {
	const [descentData, setDescentData] = useState<DescentMap | null>(null);
	const [combinedData, setCombinedData] = useState<DescentMap | null>(null);

	useEffect(() => {
		fetch("/json/descent.json")
			.then((res) => res.json())
			.then((json) => {
				setDescentData(json);
				try {
					const result = combineDescentData(response.descentStats, json);
					setCombinedData(result);
				} catch {
					setCombinedData(null);
				}
			})
			.catch(() => {
				setDescentData(null);
				setCombinedData(null);
			});
	}, [response.descentStats]);

	if (!descentData || !combinedData) {
		return <LoaderCircle className="animate-spin"></LoaderCircle>;
	}

	const opalsSpent = calculateOpalsSpent(combinedData);

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

	const headsMap = [
		{ key: "eww", label: "Eww", kills: 0, exp: 1, playerKills: 0, playerEXP: 0, color: "#A9A9A9ff" },
		{ key: "yucky", label: "Yucky", kills: 50, exp: 2, playerKills: 0, playerEXP: 0, color: "#808080ff" },
		{ key: "meh", label: "Meh", kills: 200, exp: 3, playerKills: 0, playerEXP: 0, color: "#FFFFFFff" },
		{ key: "decent", label: "Decent", kills: 500, exp: 4, playerKills: 0, playerEXP: 0, color: "#FFFF00ff" },
		{ key: "salty", label: "Salty", kills: 1000, exp: 5, playerKills: 0, playerEXP: 0, color: "#008000ff" },
		{ key: "tasty", label: "Tasty", kills: 2000, exp: 6, playerKills: 0, playerEXP: 0, color: "#ADD8E6ff" },
		{ key: "succulent", label: "Succulent", kills: 5000, exp: 7, playerKills: 0, playerEXP: 0, color: "#00AAAAff" },
		{ key: "divine", label: "Divine", kills: 10000, exp: 10, playerKills: 0, playerEXP: 0, color: "#FFC0CBff" },
		{ key: "heavenly", label: "Heavenly", kills: 25000, exp: 15, playerKills: 0, playerEXP: 0, color: "#800080ff" },
		{ key: "ethereal", label: "Ethereal", kills: 50000, exp: 20, playerKills: 0, playerEXP: 0, color: "#8B0000ff" },
		{ key: "indescribable", label: "Indescribable", kills: 100000, exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
		{ key: "special", label: "Special", kills: "YouTube", exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
		{ key: "sweet", label: "Sweet", kills: "Admin", exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
	];

	let totalKills = 0;
	let totalExp = 0;
	headsMap.forEach((key) => {
		const kills = ((response.extendedStats as Record<string, number | string | object>)[`heads_${key.key}`] ?? 0) as number;
		key.playerKills = kills;
		totalKills += kills;
		totalExp += kills * key.exp;
		key.playerEXP = kills * key.exp;
	});

	const playerAod: number = response.extendedStats.angel_of_death_level ?? 0;

	console.log(response);
	return (
		<>
			<Tabs>
				{/* TODO figure out how to get selected to work */}
				<TabList
					className={"bg-gray-900 h-12 w-full flex gap-2 items-center px-2 overflow-scroll lg:overflow-auto text-base lg:text-lg"}
				>
					<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Descent</Tab>
					<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Potions</Tab>
					<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Heads</Tab>
				</TabList>

				<TabPanel>
					<div className="flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
						<div className="w-full lg:w-1/2 h-100rem bg-gray-800 py-3 px-4 flex flex-col gap-2 items-center rounded-2xl">
							<h2 className="font-semibold flex items-center flex-col justify-center text-center">
								<Title color="text-blue-400">Angel&apos;s Descent</Title>
								<span className="text-base">
									Hover over upgrades for details<br></br> Descent is as it appears on Hypixel
								</span>
								<span className="text-red-500 text-base">Use desktop for the best experience</span>
							</h2>

							<DescentGUI combinedData={combinedData}></DescentGUI>
						</div>
						<div className="w-full lg:w-1/2 h-full p-0 flex gap-4 flex-col justify-between ">
							<div className="w-full h-auto bg-gray-800 rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
								<Title color="text-blue-400">Angel&apos;s Descent Soul Upgrades</Title>
								<table className="text-lg w-full">
									<tbody>
										<tr>
											<td>Grand Slam</td>
											<td className={`pr-4 ${response.descentStats.grand_slam == 3 ? "text-green-600" : ""}`}>
												{response.descentStats.grand_slam}/3
											</td>
											<td>+{2 * (response.descentStats.grand_slam ?? 0)}</td>
										</tr>
										<tr>
											<td>Soul Seeker</td>
											<td className={`pr-4 ${response.descentStats.shard_seeker == 5 ? "text-green-600" : ""}`}>
												{response.descentStats.shard_seeker}/5
											</td>
											<td>+{2 * (response.descentStats.shard_seeker ?? 0)}%</td>
										</tr>
										<tr>
											<td>Xezbeth Luck</td>
											<td className={`pr-4 ${response.descentStats.xezbeth_luck == 2 ? "text-green-600" : ""}`}>
												{(response.descentStats.xezbeth_luck ?? 0) + 1}/3
											</td>
											<td>+{(response.descentStats.xezbeth_luck ?? 0) + 1}</td>
										</tr>
										<tr>
											<td>Harvesting Season</td>
											<td className={`pr-4 ${response.descentStats.harvesting_season == 4 ? "text-green-600" : ""}`}>
												{(response.descentStats.harvesting_season ?? 0) + 1}/5
											</td>
											<td>{((response.descentStats.harvesting_season ?? 0) + 1) * 2}%</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="w-full h-auto bg-gray-800 rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
								<Title color="text-blue-400">Angel&apos;s Descent Progress</Title>
								<table className="text-lg w-full">
									<tbody>
										<tr>
											<td>Current Opals</td>
											<td className="">{response.stats.opals}</td>
											<td></td>
										</tr>
										<tr>
											<td>Opalsmith</td>
											<td className={` ${response.descentStats.opalsmith === 1 ? "text-green-600" : ""}`}>
												{response.descentStats.opalsmith ? "Unlocked" : "Locked"}
											</td>
											<td></td>
										</tr>

										<tr>
											<td>Opals Spent</td>
											<td className={` ${opalsSpent === 410 ? "text-green-600" : ""}`}>{opalsSpent} / 410</td>
											<td></td>
										</tr>
										<tr>
											<td colSpan={2} className="pb-3">
												<span className="text-sm">Descent Progress</span>
												<ProgressBar
													progress={opalsSpent}
													total={410}
													bgColor="#424242"
													progressColor="magenta"
													decimals={0}
													mode={ProgressBarMode.PERCENTAGE_ONLY}
												></ProgressBar>
											</td>
										</tr>
										<tr>
											<td>Souls</td>
											<td className="">{response.stats.souls}</td>
											<td></td>
										</tr>
										<tr>
											<td>Forgeable Opals</td>
											<td className="">
												{calculateCraftableOpals(response.stats.souls, response.descentStats.opalsmith ?? 0)}
											</td>
											<td></td>
										</tr>
										<tr>
											<td colSpan={2} className="pb-2">
												<span className="text-sm">Opal Forge Progress</span>
												<ProgressBar
													progress={response.stats.souls}
													total={response.descentStats.opalsmith == 1 ? 1250 : 1500}
													bgColor="#424242"
													progressColor="#2090ff"
													mode={ProgressBarMode.PERCENTAGE_ONLY}
													decimals={0}
												></ProgressBar>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="w-full h-auto bg-gray-800 rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
								<Title color="text-blue-400">Angel of Death Progress</Title>
								<div className="overflow-x-scroll w-full lg:overflow-x-auto">
									<table className="text-base w-full ">
										<thead>
											<tr className="text-lg text-[var(--accent)] border-b border-white">
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
											<td className={` ${response.descentStats.angels_offering ? "text-green-600" : ""}`}>
												{response.descentStats.angels_offering ? "Unlocked" : "Locked"}
											</td>
											<td></td>
										</tr>
										<tr>
											<td>Favour of the Angel (+1%)</td>
											<td className={` ${response.descentStats.favor_of_the_angel ? "text-green-600" : ""}`}>
												{response.descentStats.favor_of_the_angel ? "Unlocked" : "Locked"}
											</td>
											<td></td>
										</tr>
										<tr>
											<td>Total Corruption Chance</td>
											<td className="text-pink-500">
												{playerAod +
													(response.descentStats.angels_offering ?? 0) +
													(response.descentStats.favor_of_the_angel ? 1 : 0)}
												%
											</td>
										</tr>
										<tr>
											<td colSpan={2} className="">
												<span className="text-sm">Progress to Tier {romanize(playerAod + 1)}</span>
												<ProgressBar
													progress={response.stats.coins}
													total={aodMap[playerAod].cost}
													bgColor="#424242"
													progressColor="#cc3320ff"
													decimals={0}
													mode={ProgressBarMode.PERCENTAGE_ONLY}
												/>
											</td>
										</tr>
										<tr>
											<td colSpan={2} className="pb-2">
												<span className="text-sm">Total Angel of Death Progress</span>
												<ProgressBar
													progress={
														playerAod === 0
															? 0 + response.stats.coins
															: aodMap[playerAod - 1].total + response.stats.coins
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
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
				</TabPanel>
				<TabPanel>
					<div className="w-full h-fit p-4 flex flex-col lg:flex-row overflow-hidden bg-gray-800">
						<div className="overflow-x-scroll w-full lg:overflow-x-auto font-semibold text-base lg:text-xl">
							<table className="w-full">
								<thead>
									<tr className="border-t border-b border-white text-[var(--accent)]">
										<th className="text-left px-2">Flavour</th>
										<th className="text-right px-2">Kills Required</th>
										<th className="text-right px-2">EXP/Head</th>
										<th className="text-right px-2">Amount</th>
										<th className="text-right px-2">Amount %</th>
										<th className="text-right px-2">Total EXP</th>
										<th className="text-right px-2">EXP %</th>
									</tr>
								</thead>
								<tbody>
									{headsMap.map((obj) => {
										const flavour = obj.key;
										const kills = ((response.extendedStats as Record<string, number | string | object>)[
											`heads_${flavour}`
										] ?? 0) as number;
										return (
											<tr key={obj.key}>
												<td className="px-2" style={{ color: obj.color }}>
													{obj.label}
												</td>
												<td className="px-2 text-right">{obj.kills.toLocaleString()}</td>
												<td className="px-2 text-right">{obj.exp}</td>
												<td className="px-2 text-right">{kills.toLocaleString()}</td>
												<td className="px-2 text-right">{((kills / totalKills) * 100).toFixed(2)}%</td>
												<td className="px-2 text-right">{obj.playerEXP.toLocaleString()}</td>
												<td className="px-2 text-right">{((obj.playerEXP / totalExp) * 100).toFixed(2)}%</td>
											</tr>
										);
									})}
									<tr className="font-bold border-t border-white">
										<td className="px-2">Total</td>
										<td></td>
										<td></td>
										<td className="px-2 text-right">{totalKills.toLocaleString()}</td>
										<td></td>
										<td className="px-2 text-right">{totalExp.toLocaleString()}</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</TabPanel>
			</Tabs>
		</>
	);
};

interface TitleProps {
	color: string;
	children: React.ReactNode;
}
const Title: React.FC<TitleProps> = ({ children, color }) => {
	return <span className={`text-xl font-semibold ${color}`}>{children}</span>;
};

export default GrimReaper;
