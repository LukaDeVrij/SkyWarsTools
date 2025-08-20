"use client";
// Have to use client for Tabs to work properly - this also means everything else is client side -
// TODO - consider if this is the best approach for performance
// If we want to use server components, we must use URL params I think (does this work with fetching? - Ideally we dont want to fetch all data again)
import React, { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DescentGUI from "./reaper/DescentGUI";
import { calculateCraftableOpals, calculateOpalProgress, calculateOpalsSpent, combineDescentData } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import { DescentMap } from "@/app/types/DescentMap";
import ProgressBar from "../../universal/ProgressBar";

enum ProgressBarMode {
	DEFAULT,
	PERCENTAGE_ONLY,
}

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

	console.log(response);
	return (
		<>
			<Tabs>
				{/* TODO figure out how to get selected to work */}
				<TabList
					className={
						"bg-gray-900 h-12 w-full flex gap-2 items-center px-2 overflow-scroll lg:overflow-auto text-base lg:text-lg"
					}
				>
					<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>
						Descent
					</Tab>
					<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>
						Potions
					</Tab>
					<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>
						Heads
					</Tab>
				</TabList>

				<TabPanel className={"w-full h-fit p-4 flex flex-col lg:flex-row gap-4 overflow-hidden"}>
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
										<td
											className={`pr-4 ${
												response.descentStats.harvesting_season == 4 ? "text-green-600" : ""
											}`}
										>
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
										<tr className="text-lg text-yellow-200">
											<th className="px-2 text-left">Lvl</th>
											<th className="px-2 text-left">Cost</th>
											<th className="px-2 text-left">Total</th>
											<th className="px-2 text-left">Chance</th>
										</tr>
									</thead>
									<tbody>
										{aodMap.map((row, idx) => (
											<tr
												key={row.level}
												className={
													idx === response.extendedStats.angel_of_death_level - 1
														? "text-green-500"
														: ""
												}
											>
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
											{response.extendedStats.angel_of_death_level +
												(response.descentStats.angels_offering ?? 0) +
												(response.descentStats.favor_of_the_angel ? 1 : 0)}
											%
										</td>
									</tr>
									<tr>
										<td colSpan={2} className="pb-2">
											<span className="text-sm">Angel of Death Progress</span>
											<ProgressBar
												progress={
													aodMap[response.extendedStats.angel_of_death_level - 1].total +
													response.stats.coins
												}
												total={
													response.extendedStats.angel_of_death_level >= 12
														? 12
														: aodMap[response.extendedStats.angel_of_death_level].total
												}
												bgColor="#424242"
												progressColor="darkorange"
												decimals={0}
												mode={ProgressBarMode.PERCENTAGE_ONLY}
											></ProgressBar>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
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
