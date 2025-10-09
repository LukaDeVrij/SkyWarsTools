import { timeAgo } from "@/app/utils/Utils";
import { Tooltip } from "@mui/material";
import { Snapshot } from "@/app/types/Snapshot";
import React from "react";

interface CompareViewPageProps {
	params: Promise<{ playerName: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

type SnapshotsResponse = {
	[key: string]: Snapshot;
};
import { createCompareStatsMapFromSnapshot } from "@/app/utils/CompareStatsMap";
import ErrorView from "@/app/components/universal/ErrorView";

const PlayerStatsLayout = async ({ searchParams, params }: CompareViewPageProps) => {
	const awaitedParams = await params;
	const awaitedSearchParams = searchParams ? await searchParams : undefined;
	const playerName = awaitedParams.playerName;
	const k = awaitedSearchParams ? awaitedSearchParams.k : undefined;

	if (k && Array.isArray(k) ? k.length > 20 : typeof k === "string" && k.split(",").length > 20) {
		return (
			<ErrorView statusCode={"Too many snapshots!"} statusText="You may select up to 20 snapshots for compare/session."></ErrorView>
		);
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${playerName}&keys=${k}`, {
		method: "GET",
	});
	const data: SnapshotsResponse = await res.json();

	if (!data || Object.keys(data).length < 1) {
		return (
			<div className="bg-red-500 text-black font-bold p-2 rounded-xl flex flex-col">
				<span>Error: You need at least 1 snapshots!</span>
				<span className="text-[12px] text-red-900">
					If you went through the selector menu, something went wrong, please report (Click about)
				</span>
			</div>
		);
	}

	const snapshots = Object.values(data).sort((a, b) => a.queried - b.queried); // chronological order

	const compareStats: Snapshot[] = [];
	snapshots.forEach((snapshot) => {
		const updatedSnapshot = createCompareStatsMapFromSnapshot(snapshot, true) as Snapshot["stats"];
		compareStats.push({ ...snapshot, stats: updatedSnapshot });
	});

	const hasDifferentStatsVersion = snapshots.some((s, i, arr) => arr.some((other) => other.statsVersion !== s.statsVersion));
	const hasOldStatsVersion = snapshots.some((s) => s.statsVersion < 4); // Example threshold

	const formatDate = (timestamp: number) => {
		const options: Intl.DateTimeFormatOptions = {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(timestamp).toLocaleString(undefined, options);
	};

	const getDiff = (a: number, b: number) => a - b;

	const queriedDiffs = snapshots.map((snap, idx, arr) => (idx > 0 ? snap.queried - arr[idx - 1].queried : 0));

	const formatTimeDiff = (diff: number) => {
		const seconds = Math.floor((diff / 1000) % 60);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		let result = "";
		if (days > 0) result += `${days}d `;
		if (hours > 0) result += `${hours}h `;
		if (minutes > 0) result += `${minutes}m `;
		if (seconds > 0 || result === "") result += `${seconds}s`;

		return result.trim();
	};

	return (
		<div className="p-2 lg:p-4 bg-content overflow-x-auto">
			{hasDifferentStatsVersion && (
				<div className="bg-yellow-500 w-full text-black font-bold p-3 rounded-xl flex flex-col">
					<span className="w-fit">Warning: Snapshots have different stats versions!</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			{hasOldStatsVersion && (
				<div className="bg-yellow-500 w-full text-black font-bold p-3 rounded-xl flex flex-col">
					<span>Warning: Some snapshots have an older version.</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			<table className="w-full bg-layer rounded-b-lg  rounded-xl">
				<thead className="text-left text-accent border-b-2">
					<tr>
						<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">Stat</th>
						{snapshots.map((snap, idx) => (
							<React.Fragment key={snap.queried}>
								{idx > 0 && (
									<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
										<Tooltip title={formatTimeDiff(queriedDiffs[idx])}>
											<span>Delta</span>
										</Tooltip>
									</th>
								)}
								<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
									<Tooltip title={timeAgo(snap.queried / 1000)}>
										<span className="text-xs">{formatDate(snap.queried)}</span>
									</Tooltip>
								</th>
							</React.Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					{Object.keys(compareStats[compareStats.length - 1].stats).map((key) => (
						<tr key={key} className="border-b last:border-b-0">
							<td className="p-1 lg:py-2 lg:px-3 font-semibold text-l lg:text-xl">{key}</td>
							{compareStats.map((snap, idx) => (
								<React.Fragment key={snap.queried}>
									{idx > 0 && (
										<td className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
											{typeof snap.stats[key as keyof typeof snap.stats] === "number" &&
											typeof compareStats[idx - 1].stats[key as keyof typeof snap.stats] === "number" ? (
												<span
													className={
														getDiff(
															snap.stats[key as keyof typeof snap.stats] as number,
															compareStats[idx - 1].stats[key as keyof typeof snap.stats] as number
														) > 0
															? "text-green-500"
															: getDiff(
																	snap.stats[key as keyof typeof snap.stats] as number,
																	compareStats[idx - 1].stats[key as keyof typeof snap.stats] as number
															  ) < 0
															? "text-red-500"
															: ""
													}
												>
													{getDiff(
														snap.stats[key as keyof typeof snap.stats] as number,
														compareStats[idx - 1].stats[key as keyof typeof snap.stats] as number
													) > 0 && "+"}
													{getDiff(
														snap.stats[key as keyof typeof snap.stats] as number,
														compareStats[idx - 1].stats[key as keyof typeof snap.stats] as number
													).toLocaleString()}
												</span>
											) : (
												<span>-</span>
											)}
										</td>
									)}
									<td className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">
										{typeof snap.stats[key as keyof typeof snap.stats] === "number" ? (
											<span>{(snap.stats[key as keyof typeof snap.stats] as number).toLocaleString()}</span>
										) : typeof snap.stats[key as keyof typeof snap.stats] === "string" ? (
											<span>{snap.stats[key as keyof typeof snap.stats]}</span>
										) : (
											<span>-</span>
										)}
									</td>
								</React.Fragment>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default PlayerStatsLayout;
