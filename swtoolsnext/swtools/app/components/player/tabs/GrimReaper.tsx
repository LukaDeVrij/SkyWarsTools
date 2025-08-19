"use client";
// Have to use client for Tabs to work properly - this also means everything else is client side -
// TODO - consider if this is the best approach for performance
// If we want to use server components, we must use URL params I think (does this work with fetching? - Ideally we dont want to fetch all data again)
import React from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DescentGUI from "./reaper/DescentGUI";

const GrimReaper: React.FC<APIResponse> = (response) => {
	return (
		<>
			<Tabs>
				{/* TODO figure out how to get selected to work */}
				<TabList
					className={
						"bg-gray-900 h-12 w-full flex gap-2 items-center px-2 overflow-x-scroll lg:overflow-auto text-base lg:text-lg"
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

				<TabPanel className={"w-full h-auto p-4 flex flex-col lg:flex-row gap-4"}>
					<div className="w-full lg:w-1/2 h-full bg-gray-800 p-4 flex flex-col gap-2 items-center rounded-4xl">
						<h2 className="font-semibold flex items-center flex-col justify-center text-center">
							<span className="text-l text-blue-300">Angel&apos;s Descent</span>
							<span className="text-sm">Hover over upgrades for details<br></br> Tiered descriptions are of the upgrade, not current value</span>
							<span className="text-red-500 text-sm">Use desktop for the best experience</span>
						</h2>

						<DescentGUI data={response.descentStats}></DescentGUI>
					</div>
					<div className="w-full lg:w-1/2 h-full p-0">
						<div className="w-full h-auto bg-gray-800 rounded-4xl p-4">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae non placeat ad, rerum
							asperiores nam est quia vel quae, similique quos nisi, ipsam tempora excepturi? Repudiandae
							expedita similique non quos.
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

export default GrimReaper;
