"use client";
import React from "react";
import useSWR from "swr";
import HoverableSpan from "../universal/HoverableSpan";
import { LineChart } from "@mui/x-charts";
import { createTheme, ThemeProvider } from "@mui/material";
import { fetcher } from "@/app/utils/Utils";
import Loading from "../universal/Loading";

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
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		}
	);
	const { data: ranking } = useSWR<GetRankResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRank/skywars_experience?uuid=${encodeURIComponent(uuid)}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		}
	);

	let delta = "~";
	if (data && ranking && data.rankHistory && Object.keys(data.rankHistory).length >= 2) {
		const rankHistory = data.rankHistory;

		const dates = Object.keys(rankHistory);
		const previousRank = rankHistory[dates[dates.length - 1]];
		const currentRank = ranking.rank;

		delta = (previousRank - currentRank).toString();
		if (delta[0] !== "-") {
			delta = "+" + delta;
		}
	}

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
					{data && data.rankHistory && Object.keys(data.rankHistory).length > 0 ? (
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
					) : isLoading ? (
						<div className="h-full flex justify-center items-center">
							<Loading height={50} />
						</div>
					) : (
						<div className="h-full bg-content m-4 rounded-xl flex justify-center items-center">
							<p className="text-center text-gray-400 p-4">
								No rank history data available
								<br />
								Player will be included in the rankings next week!
							</p>
						</div>
					)}
				</ThemeProvider>
			</div>
		</div>
	);
};

export default RankGraph;
