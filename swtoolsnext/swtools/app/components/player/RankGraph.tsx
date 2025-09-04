"use client";
import { LineChart } from "@mui/x-charts/LineChart";
import React from "react";
import useSWR from "swr";

interface RankGraphProps {
	uuid: string;
	// data: any; // Define the type of data if known
}

const RankGraph: React.FC<RankGraphProps> = ({ uuid }) => {
	const fetcher = (url: string) => fetch(url).then((res) => res.json());

	const { data, error, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRankHistory?uuid=${encodeURIComponent(uuid)}`,
		fetcher
	);
	// console.log(data);

	function formattedWeekToDate(weekString: string): Date {
		const [yearStr, weekStr] = weekString.split("-W");
		const year = parseInt(yearStr, 10);
		const week = parseInt(weekStr, 10);

		// ISO week: Monday is the first day of the week
		const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
		const dayOfWeek = simple.getUTCDay();
		const isoMonday = simple;
		if (dayOfWeek <= 4) {
			isoMonday.setUTCDate(simple.getUTCDate() - dayOfWeek + 1);
		} else {
			isoMonday.setUTCDate(simple.getUTCDate() + 8 - dayOfWeek);
		}
		return isoMonday;
	
	}

	return (
		<div className="w-full h-50 lg:h-72  lg:w-[60%] bg-content p-4">
			<div className="w-full h-full flex flex-col justify-between bg-layer rounded-2xl p-4 gap-2">
				<div className="h-[25%] flex flex-row justify-start items-start">
					<div className="w-[25%] flex flex-col mx-4 font-semibold">
						<span>Global Ranking</span>
						<span className="text-4xl">#32</span>
					</div>
					<div className="w-[25%] flex flex-col mx-4 font-semibold">
						<span>Delta</span>
						<span className="text-4xl text-red-500">-4</span>
					</div>
				</div>
				{/* Desktop */}
				<div className="h-[75%] w-full px-2 hidden lg:block">
					<LineChart
						xAxis={[
							{
								data: Object.keys(data?.rankHistory || {}).map((key) => formattedWeekToDate(key)),
								labelStyle: { fill: "#fff" },
								tickLabelStyle: { fill: "#fff" },
								scaleType: "time",
							},
						]}
						yAxis={[
							{
								labelStyle: { fill: "#fff" },
								tickLabelStyle: { fill: "#fff" },
							},
						]}
						series={[
							{
								data: [2, 5.5, 2, 8.5, 1.5, 5],
								color: "#FFD600", // yellow
							},
						]}
						margin={{ left: -20, bottom: 0 }}
						height={170}
						className="w-full h-full"
					/>
				</div>
				{/* Mobile */}
				<div className="h-[75%] w-full px-2 block lg:hidden">
					{/* <LineChart
						xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
						series={[
							{
								data: [2, 5.5, 2, 8.5, 1.5, 5],
							},
						]}
						margin={{ left: -20, bottom: 0 }}
						height={170}
						className="w-full h-full"
					/> */}
				</div>
			</div>
		</div>
	);
};

export default RankGraph;
