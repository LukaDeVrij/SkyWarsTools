"use client";
import { auth } from "@/app/firebase/config";
import { Snapshot } from "@/app/types/Snapshot";
import { fetcher, timeAgo } from "@/app/utils/Utils";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR from "swr";
import { createCompareStatsMapFromSnapshot } from "@/app/utils/CompareStatsMap";

type SnapshotsResponse = {
	[key: string]: Snapshot;
};

const CalculateViewPage = () => {
	const [user, loading, authError] = useAuthState(auth);

	const playerName = useParams().playerName as string;
	const keys = useSearchParams().get("k") as string;

	const { data, error, isLoading } = useSWR<SnapshotsResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${playerName}&keys=${keys}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);
	const compareStats: Record<string, number | string | undefined>[] = Object.keys(data || {}).map((key) => {
		const snapshot = data ? data[key] : null;
		if (!snapshot) return {};
		return createCompareStatsMapFromSnapshot(snapshot);
	});

	console.log(compareStats);

	return (
		<div className="overflow-x-auto p-2 lg:p-4 bg-content">
			{true && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
					<span className="w-fit">Warning: Snapshots have different stats versions!</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			{true && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
					<span>Warning: Some snapshots have an older version.</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
		</div>

		//
	);
};

export default CalculateViewPage;
