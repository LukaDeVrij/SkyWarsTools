"use client";
import SessionCanvas from "@/app/components/player/selection/SessionCanvas";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

type SnapshotsResponse = {
	[key: string]: Snapshot;
};
type Snapshot = {
	player: string;
	uuid: string;
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
		wins_solo_normal: number;
		losses_solo_normal: number;
		kills_solo_normal: number;
		deaths_solo_normal: number;
		wins_solo_insane: number;
		losses_solo_insane: number;
		kills_solo_insane: number;
		deaths_solo_insane: number;
		wins_team: number;
		losses_team: number;
		kills_team: number;
		deaths_team: number;
		wins_team_normal: number;
		losses_team_normal: number;
		kills_team_normal: number;
		deaths_team_normal: number;
		wins_team_insane: number;
		losses_team_insane: number;
		kills_team_insane: number;
		deaths_team_insane: number;
		time_played_team: number;
		wins_mini: number;
		kills_mini: number;
		time_played_mini: number;
		games_mini: number;
	};
	statsVersion: number;
	queried: number;
};
const PlayerStatsLayout = () => {
	return (
		<div className="bg-content h-200 p-2 lg:p-8">
			<Tabs>
				<TabList
					className={
						"bg-main flex gap-2 items-center p-1 overflow-scroll lg:overflow-auto text-base lg:text-lg rounded-t-xl justify-center"
					}
				>
					<Tab
						selectedClassName={"selected-tab"}
						className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
					>
						Overall
					</Tab>
					<Tab
						selectedClassName={"selected-tab"}
						className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
					>
						Solo
					</Tab>
					<Tab
						selectedClassName={"selected-tab"}
						className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
					>
						Teams
					</Tab>
					<Tab
						selectedClassName={"selected-tab"}
						className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
					>
						Mini
					</Tab>
				</TabList>
				<TabPanel>
					<SessionCanvas />
				</TabPanel>
				<TabPanel>
					<SessionCanvas />
				</TabPanel>
				<TabPanel>
					<SessionCanvas />
				</TabPanel>
				<TabPanel>
					<SessionCanvas />
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default PlayerStatsLayout;
