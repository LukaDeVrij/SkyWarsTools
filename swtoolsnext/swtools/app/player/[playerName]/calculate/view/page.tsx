"use client";
import { auth } from "@/app/firebase/config";
import { Snapshot } from "@/app/types/Snapshot";
import { fetcher } from "@/app/utils/Utils";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR from "swr";
import { createCompareStatsMapFromSnapshot } from "@/app/utils/CompareStatsMap";
import { createTheme, ThemeProvider } from "@mui/material";
import { LineChart } from "@mui/x-charts";

type SnapshotsResponse = {
	[key: string]: Snapshot;
};

const CalculateViewPage = () => {
	const [user, loading, authError] = useAuthState(auth);

	const playerName = useParams().playerName as string;
	const keys = useSearchParams().get("k") as string;
	const stat = useSearchParams().get("stat") as string;
	const goalType = useSearchParams().get("goalType") as string;
	const statGoal = useSearchParams().get("statGoal") as string;
	const dateGoal = useSearchParams().get("dateGoal") as string;

	const emptySeries = {
		series: [],
		height: 400,
	};

	const { data, error, isLoading } = useSWR<SnapshotsResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${playerName}&keys=${keys}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);
	const compareStats: { queried: number; stat?: number | string | undefined }[] = Object.keys(data || {}).map((key) => {
		const snapshot = data ? data[key] : null;
		if (!snapshot) return { queried: parseInt(key) };
		const allStats = createCompareStatsMapFromSnapshot(snapshot);
		return {
			queried: parseInt(key),
			stat: stat ? allStats[stat] : undefined,
		};
	});

	console.log(compareStats);

	function linearRegression(data: { queried: number; stat?: number | string | undefined }[]): {
		slope: number;
		intercept: number;
		points: { x: number; y: number }[];
	} {
		// Filter out points with undefined or non-numeric stat
		const points = data.filter((d) => typeof d.stat === "number" && !isNaN(d.stat)).map((d) => ({ x: d.queried, y: d.stat as number }));

		const n = points.length;
		if (n < 2) return { slope: 0, intercept: 0, points };

		const sumX = points.reduce((acc, p) => acc + p.x, 0);
		const sumY = points.reduce((acc, p) => acc + p.y, 0);
		const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
		const sumXX = points.reduce((acc, p) => acc + p.x * p.x, 0);

		const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
		const intercept = (sumY - slope * sumX) / n;

		return { slope, intercept, points };
	}

	const regressionResult = linearRegression(compareStats);

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
			<div className="mt-2 bg-layer p-2 rounded-2xl">
				<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
					{(error || isLoading) && <LineChart loading {...emptySeries} />}
					{!error && !isLoading && regressionResult.points.length > 0 && (
						<div className="h-200 w-full px-2 block">
							<LineChart
								xAxis={[
									{
										data: regressionResult.points.map((p) => p.x * 1000), // Convert to ms for JS Date
										scaleType: "time",
										label: "Time",
										valueFormatter: (ts) => new Date(ts / 1000).toLocaleDateString(),
									},
								]}
								yAxis={[
									{
										label: stat,
										min: 89,
										max: 90
									},
								]}
								series={[
									// Known data points (white)
									{
										data: regressionResult.points.map((p) => p.y),
										type: "line",
										color: "#fff",
										showMark: true,
										label: "Data",
										connectNulls: false,
										area: false,
									},
									// Grey lines between points
									{
										data: regressionResult.points.map((p) => p.y),
										type: "line",
										color: "#888",
										showMark: false,
										label: "Data Line",
									},
									// Green trend line (regression)
									{
										data: regressionResult.points.map((p) => regressionResult.slope * p.x + regressionResult.intercept),
										type: "line",
										color: "#4ade80",
										showMark: false,
										label: "Trend",
									},
								]}
								style={{ marginLeft: "-25px" }}
							/>
						</div>
					)}
				</ThemeProvider>
			</div>
		</div>
	);
};

export default CalculateViewPage;
