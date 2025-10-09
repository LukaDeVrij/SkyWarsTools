"use client";
import SessionCanvas from "@/app/components/player/selection/SessionCanvas";
import ErrorView from "@/app/components/universal/ErrorView";
import { Snapshot } from "@/app/types/Snapshot";
import { fetcher } from "@/app/utils/Utils";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useSWR from "swr";

type SnapshotsResponse = {
	[key: string]: Snapshot;
};
const PlayerSessionViewPage = () => {
	const { playerName } = useParams() as { playerName: string };
	const params = useSearchParams();
	const keys = params.get("k");

	const { data } = useSWR<SnapshotsResponse>(
		keys && (Array.isArray(keys) ? keys.length <= 20 : typeof keys === "string" && keys.split(",").length <= 20)
			? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${playerName}&keys=${keys}`
			: null,
		fetcher
	);

	if (keys && (Array.isArray(keys) ? keys.length > 20 : typeof keys === "string" && keys.split(",").length > 20)) {
		return (
			<ErrorView statusCode={"Too many snapshots!"} statusText="You may select up to 30 snapshots for compare/session."></ErrorView>
		);
	}

	return (
		<div className="bg-content h-auto p-2 lg:p-8 lg:rounded-b-xl">
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
					<SessionCanvas data={data} mode={"overall"} />
				</TabPanel>
				<TabPanel>
					<SessionCanvas data={data} mode={"solo"} />
				</TabPanel>
				<TabPanel>
					<SessionCanvas data={data} mode={"team"} />
				</TabPanel>
				<TabPanel>
					<SessionCanvas data={data} mode={"mini"} />
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default PlayerSessionViewPage;
