"use client";
import { fetcher } from "@/app/utils/Utils";
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
		<div className="bg-layer rounded-xl p-6 m-0 flex flex-col items-center w-100">
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
					) : (
						data && (
							<table className="w-full text-sm mb-2">
								<thead>
									<tr className="border-b-2">
										<th className="text-left px-2 py-1">Map</th>
										<th className="text-left px-2 py-1">Mode</th>
										<th className="text-left px-2 py-1">Time Ago</th>
									</tr>
								</thead>
								<tbody>
									{data.games.slice(0, 3).map((game, idx) => {
										const timeAgo = (() => {
											const diff = Date.now() - game.date;
											const seconds = Math.floor(diff / 1000);
											const minutes = Math.floor(seconds / 60);
											const hours = Math.floor(minutes / 60);
											const days = Math.floor(hours / 24);
											if (days > 0) return `${days}d ago`;
											if (hours > 0) return `${hours}h ago`;
											if (minutes > 0) return `${minutes}m ago`;
											return `${seconds}s ago`;
										})();
										return (
											<tr key={idx} className="border-b">
												<td className="px-2 py-1">{game.map}</td>
												<td className="px-2 py-1">{game.mode}</td>
												<td className="px-2 py-1">{timeAgo}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)
					)}
				</>
			)}
		</div>
	);
};

export default RecentGames;
