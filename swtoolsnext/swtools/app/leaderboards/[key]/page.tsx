"use client";
import React from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { calcLevel, fetcher, shortenUUID } from "@/app/utils/Utils";
import { getPlayerRank } from "@/app/utils/RankTag";
import MinecraftText from "@/app/utils/MinecraftText";
import { formatScheme } from "@/app/utils/Scheme";
import { ArrowBigLeft, ArrowBigRight, LoaderCircle, Search } from "lucide-react";
import { keys } from "@/app/utils/LeaderboardKeys";

type LBResponse = {
	stat: string;
	page: number;
	entries: LBEntry[];
};

type LBEntry = {
	uuid: string;
	score: number;
	info: {
		player: string;
		display: {
			levelFormattedWithBrackets?: string;
			levelFormatted: string;
			newPackageRank?: string;
			monthlyPackageRank?: string;
			rankPlusColor?: string;
			monthlyRankColor?: string;
			active_scheme?: string;
		};
		queried: number;
		exp: number;
	};
};

const Page = () => {
	const params = useParams();
	const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;
	const page = searchParams?.get("page") ? parseInt(searchParams.get("page")!) : 1;
	const highlightParam = searchParams?.get("highlight") || "";
	const [highlight, setHighlight] = React.useState<string>(highlightParam);
	const awaitedParams = params;

	const [errorMsg, setError] = React.useState<string | null>(null);

	const { data, error, isLoading } = useSWR<LBResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getLB/${awaitedParams.key}?page=${page}`,
		fetcher
	);

	if (isLoading) {
		return (
			<div className="w-full lg:w-3/4 mx-auto flex justify-center align-center mt-10">
				<LoaderCircle className="animate-spin w-50 h-50"></LoaderCircle>
			</div>
		);
	}
	if (error) {
		return <div className="w-full lg:w-3/4 mx-auto">Error loading data</div>;
	}

	console.log(data);

	const statKey = data?.stat;
	const statInfo = statKey ? keys.find((k) => k.value === statKey) : undefined;

	return (
		<>
			<div className="flex items-center  border border-accent rounded-lg gap-3 mx-auto">
				<Search className="px-2 w-10 h-10"></Search>
				<input
					placeholder="Search a player..."
					className=" outline-none w-full p-1 font-semibold"
					onKeyDown={async (e) => {
						if (e.key === "Enter") {
							const playerName = (e.target as HTMLInputElement).value.trim();
							if (!playerName) return;
							try {
								const uuidRes = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${playerName}`);
								if (!uuidRes.ok) {
									setError("Player not found.");
									return;
								}
								const uuidData = await uuidRes.json();
								const uuid = uuidData?.uuid;
								if (!uuid) {
									setError("Player not found.");
									return;
								}
								const res = await fetch(
									`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRank/${awaitedParams.key}?uuid=${shortenUUID(uuid)}`
								);
								if (!res.ok) {
									setError("Player not on leaderboard!");
									return;
								}
								const data = await res.json();

								const pageSize = 50;
								const pageIndex = data.rank ? Math.floor((data.rank - 1) / pageSize) + 1 : 1;
								if (pageIndex == page) {
									setHighlight(shortenUUID(uuid));
								} else {
									window.location.search = `?page=${pageIndex}&highlight=${shortenUUID(uuid)}`;
								}
							} catch (err: unknown) {
								setError("An error occurred.");
								console.error(err);
							}
						}
					}}
				/>
			</div>
			<div className="flex items-center rounded-lg mx-auto mb-2 p-1">
				{errorMsg && <span className="text-red-500 font-semibold">{errorMsg}</span>}
			</div>
			<div className="w-full lg:w-3/4 mx-auto flex flex-col items-center justify-center gap-0">
				<div className="w-full flex flex-row items-end justify-between">
					<h2 className="text-2xl font-bold text-center text-accent pt-2 px-6 rounded-t-xl bg-content w-fit">{statInfo?.name}</h2>
					<div className="flex items-center gap-3 bg-content p-1 px-2 rounded-t-xl">
						<button
							className="px-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
							disabled={page <= 1}
							onClick={() => {
								const prevPage = page - 1;
								window.location.search = `?page=${prevPage}${highlight ? `&highlight=${highlight}` : ""}`;
							}}
						>
							<ArrowBigLeft></ArrowBigLeft>
						</button>
						<span className="font-semibold text-lg bg-layer px-3 rounded-xl">{page}</span>
						<button
							className="px-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
							disabled={!data || data.entries.length < 50}
							onClick={() => {
								const nextPage = page + 1;
								window.location.search = `?page=${nextPage}${highlight ? `&highlight=${highlight}` : ""}`;
							}}
						>
							<ArrowBigRight></ArrowBigRight>
						</button>
					</div>
				</div>

				<table className="w-full bg-content rounded-b-lg overflow-hidden">
					<thead className="text-left text-accent border-b-2">
						<tr>
							<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">#</th>
							<th className="p-1 lg:py-2 lg:px-0 text-l lg:text-xl">Level</th>
							<th className="p-1 lg:py-2 lg:pr-3 text-l lg:text-xl">Player</th>
							<th className="p-1 lg:py-2 lg:px-3 text-l lg:text-xl">Value</th>
						</tr>
					</thead>
					<tbody>
						{data?.entries?.map((entry: LBEntry, index: number) => {
							/* eslint-disable  @typescript-eslint/no-explicit-any */
							const mockOverallResponse = {
								...entry.info,
								uuid: entry.uuid,
								stats: {},
								guild: undefined,
								took: 0,
							} as any;

							const highlighted = highlight === entry.uuid;

							const level = calcLevel(entry.info.exp ?? 0);
							const scheme = formatScheme(level, mockOverallResponse, false);

							const rank = getPlayerRank(mockOverallResponse);

							const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
							const isStale = Date.now() - entry.info.queried > THIRTY_DAYS_MS;
							return (
								<tr
									key={entry.uuid}
									className={`border-b last:border-b-0 hover:bg-accent/10 transition-colors relative ${
										isStale ? "opacity-50" : ""
									} ${highlighted ? "bg-yellow-300/10 animate-pulse" : ""}`}
									style={isStale ? { backgroundColor: "rgba(128,128,128,0.2)" } : undefined}
								>
									{isStale && <td colSpan={4} className="absolute inset-0 bg-gray-500 bg-opacity-30 z-1"></td>}
									<td className="p-1 lg:py-2 lg:px-3 font-semibold text-l lg:text-xl relative z-2">
										{index + (page - 1) * 50 + 1}
									</td>
									<td className="p-1 lg:py-2 lg:px-0 font-semibold text-l lg:text-xl relative z-2">
										<MinecraftText>{scheme}</MinecraftText>
									</td>
									<td className="p-1 lg:py-2 lg:px-r font-semibold text-l lg:text-xl relative z-2">
										<a href={`/player/${entry.uuid}/stats`}>
											<MinecraftText>{`${rank.prefix} ${entry.info.player}`}</MinecraftText>
										</a>
									</td>
									<td className="p-1 lg:py-2 lg:px-3 font-semibold text-l lg:text-xl relative z-2">
										{entry.score.toLocaleString()}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Page;
