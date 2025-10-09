"use client";
import { fetcher, timeAgo } from "@/app/utils/Utils";
import useSWR from "swr";
import { useState } from "react";

type RecentGame = {
	date: number;
	gameType: string;
	mode: string;
	map: string;
	ended: number;
};
type RecentGamesResponse = {
	success: boolean;
	uuid: string;
	games: RecentGame[];
};

const RecentGames: React.FC<{ uuid: string }> = ({ uuid }) => {
	const [fetchUrl, setFetchUrl] = useState<string | null>(null);
	const { data, error, isLoading } = useSWR<RecentGamesResponse>(fetchUrl, fetchUrl ? fetcher : null);

	const handleFetch = () => {
		setFetchUrl(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/recentGames?player=${uuid}`);
	};

	return (
		<div className="bg-layer rounded-xl p-6 m-0 flex flex-col items-center w-full lg:w-100 aspect-square">
			<div className="font-bold mb-2 text-2xl">Recent Games</div>
			<button
				className="bg-button text-white px-4 py-2 rounded mb-4 animate-press cursor-pointer"
				onClick={handleFetch}
				disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Get Recent Games"}
			</button>
			{fetchUrl && (
				<>
					{isLoading && <div>Loading recent games...</div>}
					{error || (data && !data.success) ? (
						<div>Failed to load recent games.</div>
					) : data ? (
						data.games.length === 0 ? (
							<p className="text-center text-base text-red-400">
								Nothing here? <br></br><br></br>Player has recent games disabled or hasn&apos;t played any games recently.
							</p>
						) : (
							<table className="w-full text-sm mb-2">
								<thead>
									<tr className="border-b-2">
										<th className="text-left px-2 py-1">Map</th>
										<th className="text-left px-2 py-1">Mode</th>
										<th className="text-left px-2 py-1">Time Ago</th>
									</tr>
								</thead>
								<tbody>
									{data.games.slice(0, 3).map((game, idx) => (
										<tr key={idx} className="border-b">
											<td className="px-2 py-1">{game.map}</td>
											<td className="px-2 py-1">{game.mode}</td>
											<td className="px-2 py-1">
												{timeAgo(game.date / 1000, {
													showSeconds: false,
													showMinutes: true,
													showHours: true,
													showDays: true,
													showYears: true,
												})}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)
					) : null}
				</>
			)}
		</div>
	);
};

export default RecentGames;
