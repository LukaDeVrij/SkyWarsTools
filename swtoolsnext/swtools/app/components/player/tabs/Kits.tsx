"use client";
import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";
import TabContent from "./TabContent";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import KitPrestiges from "./kits/KitPrestiges";

const Kits: React.FC<OverallResponse> = (response) => {
	return (
		<Tabs>
			{/* TODO figure out how to get selected to work */}
			<TabList className={"bg-main h-12 w-full flex gap-2 items-center px-2 overflow-scroll lg:overflow-auto text-base lg:text-lg"}>
				<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Prestiges</Tab>
				<Tab className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}>Table</Tab>
			</TabList>

			<TabPanel>
				<TabContent>
					<KitPrestiges {...response} />
				</TabContent>
			</TabPanel>
			<TabPanel>
				<TabContent>B</TabContent>
			</TabPanel>
		</Tabs>
	);
};

export default Kits;
