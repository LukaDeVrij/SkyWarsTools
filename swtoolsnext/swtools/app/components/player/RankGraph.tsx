"use client";
import React from "react";
import useSWR from "swr";
import HoverableSpan from "../universal/HoverableSpan";

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
	const {
		data: ranking,
		error: rankingError,
		isLoading: rankingIsLoading,
	} = useSWR<GetRankResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRank/skywars_experience?uuid=${encodeURIComponent(uuid)}`,
		fetcher
	);

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

	console.log(data?.rankHistory); // This is a perfect example of the rankHistory, might be large in the future tho

	return (
		<div className="w-full h-50 lg:h-72  lg:w-[60%] bg-content p-4">
			<div className="w-full h-full flex flex-col justify-between bg-layer rounded-2xl p-4 gap-2">
				<div className="h-[25%] flex flex-row justify-start items-start">
					<div className="w-[25%] flex flex-col mx-4 font-semibold">
						<span>
							<HoverableSpan hoverText="Only within known playerbase, can be innacurate">Level Ranking</HoverableSpan>
						</span>
						<span className="text-4xl">#{ranking?.rank ?? "?"}</span>
					</div>
					<div className="w-[25%] flex flex-col mx-4 font-semibold">
						<span>
							<HoverableSpan hoverText="Difference with your position from previous week">Delta</HoverableSpan>
						</span>
						<span className={`text-4xl ${delta[0] === "+" ? "text-green-500" : delta[0] === "-" ? "text-red-500" : ""}`}>
							{delta}
						</span>
					</div>
				</div>
				{error && <div className="text-red-500 font-semibold">Failed to load data</div>}
				{isLoading && <div className="font-semibold">Loading...</div>}
				{data && (
					<>
						{/* Desktop */}
						<div className="h-[75%] w-full px-2 hidden lg:block">
							{/* TODO use a chart  */}
						</div>
						{/* Mobile */}
						<div className="h-[75%] w-full px-2 block lg:hidden"></div>
					</>
				)}
			</div>
		</div>
	);
};

export default RankGraph;
