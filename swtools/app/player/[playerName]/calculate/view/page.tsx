"use client";
import { auth } from "@/app/firebase/config";
import { Snapshot } from "@/app/types/Snapshot";
import { fetcher, formatPlaytime, toCamelCase } from "@/app/utils/Utils";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR from "swr";
import { createCompareStatsMapFromSnapshot } from "@/app/utils/CompareStatsMap";
import { createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import Loading from "@/app/components/universal/Loading";

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

	if (!data) return <Loading />;

	const snapshots: Snapshot[] = Object.values(data);
	const hasDifferentStatsVersion = snapshots.some((s: Snapshot) =>
		snapshots.some((other: Snapshot) => other.statsVersion !== s.statsVersion)
	);
	const hasOldStatsVersion = snapshots.some((s: Snapshot) => s.statsVersion < 4);

	const compareStats: { queried: number; stat?: number | string | undefined }[] = Object.keys(data || {}).map((key) => {
		const snapshot = data ? data[key] : null;
		if (!snapshot) return { queried: parseInt(key) };
		const allStats = createCompareStatsMapFromSnapshot(snapshot, false);
		return {
			queried: parseInt(key),
			stat: stat ? allStats[stat] : undefined,
		};
	});

	console.log(compareStats);

	function linearRegression(points: { x: number; y: number }[]): { m: number; b: number } {
		const n = points.length;
		if (n < 2) return { m: 0, b: 0 };

		const sumX = points.reduce((acc, p) => acc + p.x, 0);
		const sumY = points.reduce((acc, p) => acc + p.y, 0);
		const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
		const sumXX = points.reduce((acc, p) => acc + p.x * p.x, 0);

		const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
		const b = (sumY - m * sumX) / n;

		return { m, b };
	}
	const regressionResult = {
		points: compareStats.filter((s) => typeof s.stat === "number").map((s) => ({ x: s.queried, y: s.stat as number })),
		...linearRegression(compareStats.filter((s) => typeof s.stat === "number").map((s) => ({ x: s.queried, y: s.stat as number }))),
	};

	// Goal calculations
	let goal = { x: NaN, y: NaN };
	if (goalType === "statGoal" && statGoal && regressionResult.m !== 0) {
		const targetStat = parseFloat(statGoal);
		if (!isNaN(targetStat)) {
			const targetTimestamp = (targetStat - regressionResult.b) / regressionResult.m;
			goal = { x: targetTimestamp * 1000, y: targetStat };
		}
	}

	if (goalType === "dateGoal" && dateGoal && regressionResult.m !== 0) {
		const targetDate = new Date(dateGoal).getTime();
		if (!isNaN(targetDate)) {
			const targetStatValue = regressionResult.m * targetDate + regressionResult.b;
			goal = { x: targetDate * 1000, y: targetStatValue };
		}
	}

	const yMin = Math.min(...regressionResult.points.map((p) => p.y)) * 0.995;
	const yMax = !isNaN(goal.y) ? goal.y : Math.max(...regressionResult.points.map((p) => p.y)) * 1.005;

	const xAxisData = [...regressionResult.points.map((p) => p.x * 1000).reverse()];
	const trendLineData = [...regressionResult.points.map((p) => regressionResult.m * p.x + regressionResult.b).reverse()];
	const goalLineData = regressionResult.points.map(() => goal.y);
	if (goalType) xAxisData.push(goal.x);
	if (goalType) trendLineData.push(goal.y);
	if (goalType) goalLineData.push(goal.y);

	return (
		<div className="overflow-x-auto p-2 lg:p-4 bg-content">
			{hasDifferentStatsVersion && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
					<span className="w-fit">Warning: Snapshots have different stats versions!</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			{hasOldStatsVersion && (
				<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
					<span>Warning: Some snapshots have an older version.</span>
					<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
				</div>
			)}
			<div className="mt-2 bg-layer p-2 rounded-2xl">
				<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
					{(error || isLoading) && <LineChart loading {...emptySeries} />}
					{!error && !isLoading && regressionResult.points.length > 0 && (
						<div className="h-180 w-full px-2 block">
							<LineChart
								xAxis={[
									{
										data: xAxisData, // Convert to ms for JS Date
										scaleType: "time",
										label: "Time",
										valueFormatter: (ts) => new Date(ts / 1000).toLocaleDateString(),
									},
								]}
								yAxis={[
									{
										label: toCamelCase(stat),
										min: yMin,
										max: yMax,
									},
								]}
								series={[
									// Known data points (white)
									{
										data: regressionResult.points.map((p) => p.y).reverse(),
										type: "line",
										color: "#fff",
										showMark: true,
										label: "Data",
										connectNulls: true,
										area: false,
									},
									// Green trend line (regression)
									{
										data: trendLineData,
										type: "line",
										color: "#4ade80",
										showMark: false,
										label: "Trend",
									},
									// Red goal line (only if goalType is defined)
									...(goalType
										? [
												{
													data: goalLineData,
													type: "line" as const,
													color: "#f87171",
													showMark: false,
													label: "Goal",
												},
										  ]
										: []),
								]}
								style={{ marginLeft: "-25px" }}
							/>
						</div>
					)}
				</ThemeProvider>
			</div>
			<table className="min-w-[40%] mx-auto mt-4 rounded-lg bg-layer text-white text-lg font-semibold">
				<tbody>
					{[
						{
							label: "Stat gain per day",
							title: "The amount of '" + stat + "' you gain per day on average.",
							value: (regressionResult.m * 86400 * 1000).toFixed(2),
						},
						{
							label: "Current stat value",
							title: "The most recent known value of '" + stat + "'.",
							value:
								regressionResult.points.length > 0
									? regressionResult.points[regressionResult.points.length - 1].y.toFixed(2)
									: "-",
						},
						{
							label: "Predicted stat goal",
							title:
								"The predicted value of '" + stat + "' at the time you reach your goal. It is possible you set this goal.",
							value:
								goalType === "statGoal"
									? statGoal
										? parseFloat(statGoal).toFixed(2)
										: "-"
									: !isNaN(goal.y)
									? goal.y.toFixed(2)
									: "-",
						},
						{
							label: "Predicted date goal",
							title: "The predicted date you will reach your goal. It is possible you set this goal.",
							value:
								goalType === "dateGoal" && !isNaN(goal.x)
									? new Date(goal.x / 1000).toLocaleString()
									: goalType === "statGoal" && !isNaN(goal.x)
									? new Date(goal.x / 1000).toLocaleString()
									: "-",
						},
						{
							label: "Stat gain needed",
							title: "The amount of '" + stat + "' you still need to gain to reach your goal.",
							value:
								regressionResult.points.length > 0 && !isNaN(goal.y)
									? (goal.y - regressionResult.points[regressionResult.points.length - 1].y).toFixed(2)
									: "-",
						},
						{
							label: "Predicted time needed",
							title: "The predicted time you will need to reach your goal.",
							value:
								regressionResult.points.length > 0 && !isNaN(goal.x)
									? (() => {
											const goalDate = new Date(goal.x / 1000);
											const now = new Date();
											const diffMs = goalDate.getTime() - now.getTime();
											if (isNaN(diffMs) || diffMs < 0) return "-";
											return formatPlaytime(diffMs / 1000);
									  })()
									: "-",
						},
						{
							label: "Mean Squared Error",
							title: "The mean squared error of the linear regression. A lower value indicates a better fit. This is not really important, but can be used to gauge the accuracy of the predictions.",
							value:
								regressionResult.points.length > 0
									? (
											regressionResult.points.reduce(
												(acc, p) => acc + Math.pow(p.y - (regressionResult.m * p.x + regressionResult.b), 2),
												0
											) / regressionResult.points.length
									  ).toFixed(5)
									: "-",
						},
					].map((row, idx, arr) => (
						<Tooltip key={row.label} title={row.title || ""} placement="left">
							<tr key={row.label} className={idx < arr.length - 1 ? "border-b-2 border-white" : ""}>
								<td className="px-2 py-1">{row.label}</td>
								<td className="px-2 py-1">{row.value}</td>
							</tr>
						</Tooltip>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CalculateViewPage;
