"use client";
import React from "react";
import useSWR from "swr";
import HoverableSpan from "../universal/HoverableSpan";
import { LineChart } from "@mui/x-charts";
import { createTheme, ThemeProvider } from "@mui/material";
import { fetcher } from "@/app/utils/Utils";

interface RankGraphProps {
	uuid: string;
	// data: any; // Define the type of data if known
}

type RankHistoryResponse = {
	uuid: string;
	rankHistory: Record<string, number>;
};
type GetRankResponse = {
	stat: string;
	uuid: string;
	rank: number;
	score: number;
	info: {
		player: string;
		display: {
			levelFormattedWithBrackets?: string;
			levelFormatted?: string;
			newPackageRank?: string;
			monthlyPackageRank?: string;
			rankPlusColor?: string;
			monthlyRankColor?: string;
			active_scheme?: string;
			rank?: string;
			prefix?: string;
		};
		queried: number;
	};
};

const RankGraph: React.FC<RankGraphProps> = ({ uuid }) => {
	const { data, error, isLoading } = useSWR<RankHistoryResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRankHistory?uuid=${encodeURIComponent(uuid)}`,
		fetcher
	);
	const { data: ranking } = useSWR<GetRankResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRank/skywars_experience?uuid=${encodeURIComponent(uuid)}`,
		fetcher
	);

	let delta = "~";
	if (data && ranking && data.rankHistory) {
		const rankHistory = data.rankHistory;

		const dates = Object.keys(rankHistory);
		const previousRank = rankHistory[dates[0]];

		const currentRank = ranking.rank;

		delta = (previousRank - currentRank).toString();
		if (delta[0] !== "-") {
			delta = "+" + delta;
		}
	}

	const emptySeries = {
		series: [],
		height: 150,
	};

	return (
		<div className="w-full h-72  lg:w-[60%] bg-content p-4">
			<div className="w-full h-full flex flex-col justify-between bg-layer rounded-2xl gap-2">
				<div className="h-[25%] flex flex-row justify-start items-start m-4 mb-0">
					<div className="w-[50%] lg:w-[25%] flex flex-col mx-4 font-semibold">
						<span>
							<HoverableSpan hoverText="Only within known playerbase, can be innacurate">Level Ranking</HoverableSpan>
						</span>
						<span className="text-4xl">#{ranking?.rank ?? "?"}</span>
					</div>
					<div className="w-[50%] lg:w-[25%] flex flex-col mx-4 font-semibold">
						<span>
							<HoverableSpan hoverText="Difference with your position from previous week">Delta</HoverableSpan>
						</span>
						<span className={`text-4xl ${delta[0] === "+" ? "text-green-500" : delta[0] === "-" ? "text-red-500" : ""}`}>
							{delta}
						</span>
					</div>
				</div>
				<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
					{error && <LineChart loading {...emptySeries} />}
					{isLoading && <LineChart loading {...emptySeries} />}
					{data && data.rankHistory && (
						<>
							{/* Desktop AND mobile */}
							<div className="h-[75%] w-full px-2 block">
								<LineChart
									xAxis={[
										{
											data: Object.keys(data.rankHistory),
											scaleType: "band",
										},
									]}
									yAxis={[
										{
											reverse: true,
											// min: 1, // Start ticks at 1
											position: "left",
										},
									]}
									series={[
										{
											data: Object.values(data.rankHistory),
										},
									]}
									style={{ marginLeft: "-25px" }}
								/>
							</div>
						</>
					)}
				</ThemeProvider>
			</div>
		</div>
	);
};

export default RankGraph;
