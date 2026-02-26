"use client";
import React from "react";
import { fetcher } from "../utils/Utils";
import useSWR from "swr";
import Loading from "./universal/Loading";
import { ThemeProvider, createTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface DailyPlayerCountInterface {
	success: boolean;
	data: {
		counts: {
			averageCount: number;
			date: string;
			__v: number;
			_id: string;
		}[];
	};
}

interface DailyPlayerCountProps {
	fullWidth?: boolean;
}

const DailyPlayerCount: React.FC<DailyPlayerCountProps> = ({ fullWidth = false }) => {
	const options = {
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false,
	};
	const { data, error, isLoading } = useSWR<DailyPlayerCountInterface>(
		process.env.NEXT_PUBLIC_SKYWARSTOOLS_API + "/api/getCounts/daily" + (!fullWidth ? "?amount=14" : ""),
		fetcher,
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

	const counts = Array.isArray(data.data?.counts)
		? [...data.data.counts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		: [];

	return (
		<div className={`${fullWidth ? "w-full" : "lg:w-1/2"} flex flex-col items-center bg-content p-2 rounded-xl`}>
			<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
				<div className="flex items-center justify-between w-full p-2">
					<span className="text-lg font-semibold">Daily Player Count</span>
				</div>
				<div style={{ width: "100%", height: 220 }}>
					<LineChart
						xAxis={[
							{
								scaleType: "point",
								data: counts.map((d) => d.date),
							},
						]}
						series={[
							{
								data: counts.map((d) => d.averageCount),
								label: "Average Player Count",
								color: "#1976d2",
							},
						]}
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

export default DailyPlayerCount;
