"use client";
import React from "react";
import { fetcher, getRedisKey } from "../utils/Utils";
import useSWR from "swr";
import Loading from "./universal/Loading";
import { useState } from "react";
import { ButtonGroup, Button, ThemeProvider, createTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface HourlyCountsData {
	success: boolean;
	data: {
		date: string;
		counts: {
			mega_doubles: number;
			mini_normal: number;
			solo_insane: number;
			solo_insane_lucky: number;
			solo_normal: number;
			teams_insane_lucky: number;
			teams_normal: number;
		}[];
	};
}

interface PlayerCountProps {
	fullWidth?: boolean;
}

const PlayerCount = ({ fullWidth = false }: PlayerCountProps) => {
	const [mode, setMode] = useState<"overall" | "all">("overall");

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	const options = {
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false,
	};
	const { data, error, isLoading } = useSWR<{
		todayData: HourlyCountsData;
		yesterdayData: HourlyCountsData;
	}>(
		[
			process.env.NEXT_PUBLIC_SKYWARSTOOLS_API + "/api/getCounts/hourly",
			process.env.NEXT_PUBLIC_SKYWARSTOOLS_API + `/api/getCounts/hourly?date=${getRedisKey(yesterday)}`,
		],
		async ([todayUrl, yesterdayUrl]: [string, string]) => {
			const [todayData, yesterdayData] = await Promise.all([
				fetcher(todayUrl) as Promise<HourlyCountsData>,
				fetcher(yesterdayUrl) as Promise<HourlyCountsData>,
			]);
			return { todayData, yesterdayData };
		},
		options,
	);

	if (error) {
		return (
			<div
				className={`${fullWidth ? "w-full" : "lg:w-1/2"} h-50 bg-content rounded-xl p-3 lg:text-3xl flex-row gap-2 justify-between items-center flex`}
			>
				Failed to load player counts.
			</div>
		);
	}

	if (!data || isLoading) {
		return (
			<div
				className={`${fullWidth ? "w-full" : "lg:w-1/2"} h-50 bg-content rounded-xl p-3 lg:text-3xl flex-row gap-2 justify-between items-center flex`}
			>
				<Loading />
			</div>
		);
	}

	// Preprocessing data
	const shouldTakeFromYesterday = 24 - data.todayData.data.counts.length;
	const combinedCounts = [...data.yesterdayData.data.counts.slice(-shouldTakeFromYesterday), ...data.todayData.data.counts];
	const chartData = combinedCounts.map((count, idx) => ({
		hour: idx + 1 - shouldTakeFromYesterday,
		solo_normal: count.solo_normal,
		teams_normal: count.teams_normal,
		solo_insane_lucky: count.solo_insane_lucky,
		mini_normal: count.mini_normal,
		solo_insane: count.solo_insane,
		mega_doubles: count.mega_doubles,
		teams_insane_lucky: count.teams_insane_lucky,

		overall:
			count.mega_doubles +
			count.mini_normal +
			count.solo_insane +
			count.solo_insane_lucky +
			count.solo_normal +
			count.teams_insane_lucky +
			count.teams_normal,
	}));

	const seriesOverall = [
		{
			data: chartData.map((d) => d.overall),
			label: "Overall",
			color: "#1976d2",
		},
	];

	const seriesAll = [
		{ data: chartData.map((d) => d.solo_normal), label: "Solo Normal", color: "#1976d2" },
		{ data: chartData.map((d) => d.teams_normal), label: "Teams Normal", color: "#c2185b" },
		{ data: chartData.map((d) => d.mini_normal), label: "Mini Normal", color: "#388e3c" },
		{ data: chartData.map((d) => d.solo_insane_lucky), label: "Solo Insane Lucky", color: "#e64a19" },
		{ data: chartData.map((d) => d.solo_insane), label: "Solo Insane", color: "#fbc02d" },
		{ data: chartData.map((d) => d.mega_doubles), label: "Mega Doubles", color: "#7b1fa2" },
		{ data: chartData.map((d) => d.teams_insane_lucky), label: "Teams Insane Lucky", color: "#02ffd1" },
	];

	const transformHour = (hour: number) => {
		if (hour < 0) {
			return (hour + 24).toString() + "h";
		}
		return hour.toString() + "h";
	};

	return (
		<div className={`${fullWidth ? "w-full" : "lg:w-1/2"} flex flex-col items-center bg-content p-2 rounded-xl`}>
			<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
				<div className="flex items-center justify-between w-full p-2">
					<span className="text-lg font-semibold">Hourly Player Count</span>
					<ButtonGroup size={"small"}>
						<Button variant={mode === "overall" ? "contained" : "outlined"} onClick={() => setMode("overall")}>
							Overall
						</Button>
						<Button variant={mode === "all" ? "contained" : "outlined"} onClick={() => setMode("all")}>
							All Modes
						</Button>
					</ButtonGroup>
				</div>
				<div style={{ width: "100%", height: 200 }}>
					<LineChart
						xAxis={[
							{
								data: chartData.map((d) => d.hour),
								valueFormatter: transformHour,
								max: chartData[chartData.length - 1].hour,
								min: chartData[0].hour,
							},
						]}
						series={mode === "overall" ? seriesOverall : seriesAll}
						height={220}
						hideLegend={true}
						margin={{ left: 0, right: 20, top: 10, bottom: 30 }}
						grid={{ vertical: true, horizontal: false }}
					/>
				</div>
			</ThemeProvider>
		</div>
	);
};

export default PlayerCount;
