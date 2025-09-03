"use client";
import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";
import TabContent from "./TabContent";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import KitPrestiges from "./kits/KitPrestiges";
import KitsUniversalTable from "./kits/KitsUniversalTable";

const Kits: React.FC<OverallResponse> = (response) => {
	// fucking ts
	const mini_kits: { [key: string]: OverallResponse["stats"][keyof OverallResponse["stats"]] } = {};
	const normal_kits: { [key: string]: OverallResponse["stats"][keyof OverallResponse["stats"]] } = {};
	const insane_kits: { [key: string]: OverallResponse["stats"][keyof OverallResponse["stats"]] } = {};
	const mythical_kits: { [key: string]: OverallResponse["stats"][keyof OverallResponse["stats"]] } = {};

	Object.keys(response.stats).forEach((key) => {
		if (!key.includes("_kit_")) return;
		if (key.includes("_mini_solo_")) {
			mini_kits[key] = response.stats[key as keyof OverallResponse["stats"]];
		} else if (key.includes("_team_")) {
			insane_kits[key] = response.stats[key as keyof OverallResponse["stats"]];
		} else if (key.includes("_mythical_")) {
			mythical_kits[key] = response.stats[key as keyof OverallResponse["stats"]];
		} else if (key.includes("_solo_")) {
			normal_kits[key] = response.stats[key as keyof OverallResponse["stats"]];
		}
	});

	return (
		<Tabs>
			{/* TODO figure out how to get selected to work */}
			<TabList className={"bg-main h-10 w-full flex gap-2 items-center px-4 overflow-scroll lg:overflow-auto text-base lg:text-lg"}>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Prestiges
				</Tab>
				<Tab
					selectedClassName={"selected-tab"}
					className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
				>
					Table
				</Tab>
			</TabList>

			<TabPanel>
				<TabContent>
					<KitPrestiges {...response} />
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>
					<Tabs>
						<TabList
							className={
								"bg-main h-10 w-full flex gap-2 items-center overflow-scroll lg:overflow-auto text-base lg:text-lg rounded-xl"
							}
						>
							<Tab
								selectedClassName={"selected-tab"}
								className={"whitespace-nowrap p-1 rounded-xl font-semibold cursor-pointer animate-press"}
							>
								Normal
							</Tab>
							<Tab
								selectedClassName={"selected-tab"}
								className={"whitespace-nowrap p-1 rounded-xl font-semibold cursor-pointer animate-press"}
							>
								Insane
							</Tab>
							<Tab
								selectedClassName={"selected-tab"}
								className={"whitespace-nowrap p-1 rounded-xl font-semibold cursor-pointer animate-press"}
							>
								Mini
							</Tab>
							<Tab
								selectedClassName={"selected-tab"}
								className={"whitespace-nowrap p-1 rounded-xl font-semibold cursor-pointer animate-press"}
							>
								Mythical
							</Tab>
						</TabList>
						<TabPanel>
							<KitsUniversalTable kitData={normal_kits} />
						</TabPanel>
						<TabPanel>
							<KitsUniversalTable kitData={insane_kits} />
						</TabPanel>
						<TabPanel>
							<KitsUniversalTable kitData={mini_kits} />
						</TabPanel>
						<TabPanel>
							<KitsUniversalTable kitData={mythical_kits} />
						</TabPanel>
					</Tabs>
				</TabContent>
			</TabPanel>
		</Tabs>
	);
};

export default Kits;
