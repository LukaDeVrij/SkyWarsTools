"use client";
// Have to use client for Tabs to work properly - this also means everything else is client side -
// TODO - consider if this is the best approach for performance
// If we want to use server components, we must use URL params I think (does this work with fetching? - Ideally we dont want to fetch all data again)
import React, { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DescentGUI from "./reaper/DescentGUI";
import { calculateOpalsSpent, combineDescentData } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import { DescentMap } from "@/app/types/DescentMap";
import Title from "../../universal/Title";
import SoulUpgrades from "./reaper/SoulUpgrades";
import DescentProgress from "./reaper/DescentProgress";
import AngelProgress from "./reaper/AngelProgress";
import Heads from "./reaper/Heads";
import { OverallResponse } from "@/app/types/OverallResponse";
import Potions from "./reaper/Potions";
import TabContent from "./TabContent";

const GrimReaper: React.FC<OverallResponse> = (response) => {
	// console.log(response);
	const [descentData, setDescentData] = useState<DescentMap | null>(null);
	const [combinedData, setCombinedData] = useState<DescentMap | null>(null);

	useEffect(() => {
		fetch("/json/descent.json")
			.then((res) => res.json())
			.then((json) => {
				setDescentData(json);
				try {
					const result = combineDescentData(response, json);
					setCombinedData(result);
				} catch {
					setCombinedData(null);
				}
			})
			.catch(() => {
				setDescentData(null);
				setCombinedData(null);
			});
	}, [response]);

	if (!descentData || !combinedData) {
		return <LoaderCircle className="animate-spin"></LoaderCircle>;
	}

	const opalsSpent = calculateOpalsSpent(combinedData);

	return (
		<>
			<Tabs>
				{/* TODO figure out how to get selected to work */}
				<TabList
					className={"bg-main h-10 w-full flex gap-2 items-center px-4 overflow-scroll lg:overflow-auto text-base lg:text-lg"}
				>
					<Tab selectedClassName={"selected-tab"} className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Descent</Tab>
					<Tab selectedClassName={"selected-tab"} className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Potions</Tab>
					<Tab selectedClassName={"selected-tab"} className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Heads</Tab>
				</TabList>

				<TabPanel>
					<div className="flex flex-col lg:flex-row lg:gap-4 lg:p-4 overflow-hidden">
						<div className="w-full lg:w-1/2 h-100rem bg-content py-3 px-4 flex flex-col gap-2 items-center rounded-2xl">
							<h2 className="font-semibold flex items-center flex-col justify-center text-center">
								<Title color="text-blue-400">Angel&apos;s Descent</Title>
								<span className="text-base">
									Hover over upgrades for details<br></br> Descent is as it appears on Hypixel
								</span>
								<span className="text-red-500 text-base">Use desktop for the best experience</span>
							</h2>

							<DescentGUI combinedData={combinedData}></DescentGUI>
						</div>
						<div className="w-full lg:w-1/2 h-full p-0 flex lg:gap-4 flex-col justify-between ">
							<SoulUpgrades response={response}></SoulUpgrades>
							<DescentProgress response={response} opalsSpent={opalsSpent}></DescentProgress>
							<AngelProgress response={response}></AngelProgress>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<TabContent>
						<Potions response={response}></Potions>
					</TabContent>
				</TabPanel>
				<TabPanel>
					<TabContent>
						<Heads response={response}></Heads>
					</TabContent>
				</TabPanel>
			</Tabs>
		</>
	);
};

export default GrimReaper;
