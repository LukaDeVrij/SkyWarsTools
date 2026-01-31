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
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	if (keys && (Array.isArray(keys) ? keys.length > 20 : typeof keys === "string" && keys.split(",").length > 20)) {
		return (
			<ErrorView statusCode={"Too many snapshots!"} statusText="You may select up to 30 snapshots for compare/session."></ErrorView>
		);
	}
	let tooFew: boolean = false;
	if (keys && (Array.isArray(keys) ? keys.length < 2 : typeof keys === "string" && keys.split(",").length < 2)) {
		tooFew = true;
	}
	let tooMany: boolean = false;
	if (keys && (Array.isArray(keys) ? keys.length > 2 : typeof keys === "string" && keys.split(",").length > 2)) {
		tooMany = true;
	}



	return (
		<div className="bg-content h-auto p-2 lg:p-8 lg:rounded-b-xl">
			{tooFew && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col mb-2">
					<span className="w-fit">Warning: Only one snapshot selected!</span>
					<span className="text-[12px] text-yellow-900">To generate a session, pick two snapshots to calculate between.</span>
				</div>
			)}
			{tooMany && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col mb-2">
					<span className="w-fit">Warning: More than two snapshots selected!</span>
					<span className="text-[12px] text-yellow-900">Only the first two snapshots will be used to generate the session.</span>
				</div>
			)}
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
					<Tab
						selectedClassName={"selected-tab"}
						className={"whitespace-nowrap p-1 px-3 rounded-xl font-semibold cursor-pointer animate-press"}
					>
						Lab
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
				<TabPanel>
					<SessionCanvas data={data} mode={"lab"} />
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default PlayerSessionViewPage;
