"use client";
import Loading from "@/app/components/universal/Loading";
import { LBEntry, LBResponseAroundScore } from "@/app/types/Leaderboard";
import { OverallResponse } from "@/app/types/OverallResponse";
import MinecraftText from "@/app/utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { formatScheme } from "@/app/utils/Scheme";
import { calcLevel, fetcher } from "@/app/utils/Utils";
import { RefreshCcw, Search } from "lucide-react";
import React from "react";
import useSWR from "swr";

function LeaderboardClimber({ response }: { response: OverallResponse }) {
	const [updatingStatsUuid, setUpdatingStatsUuid] = React.useState<string | null>(null);
	const [lbEntries, setLbEntries] = React.useState<LBEntry[]>([]);
	const [searchInput, setSearchInput] = React.useState("");
	const [searchError, setSearchError] = React.useState<string | null>(null);
	const [searching, setSearching] = React.useState(false);

	// Fetch player rank
	const {
		data: lbAroundScoreData,
		error: lbAroundScoreError,
		isLoading: lbAroundScoreLoading,
	} = useSWR<LBResponseAroundScore>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getLBAroundScore/skywars_experience?score=${response.stats.skywars_experience ?? 0}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const {
		data: playerScore,
		error: playerScoreError,
		isLoading: playerScoreLoading,
	} = useSWR<{ rank?: number }>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getRankByScore/skywars_experience?score=${response.stats.skywars_experience ?? 0}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);
	const playerRank = playerScore?.rank;
	React.useEffect(() => {
		if (!lbAroundScoreData) return;

		// Manual insertion of the current player in the correct position, since the API might not return the current score for this player (lb is cached)
		const entries: LBEntry[] = lbAroundScoreData.entries.filter((entry: LBEntry) => entry.uuid !== response.uuid);
		const thisPlayerEntry: LBEntry = {
			uuid: response.uuid,
			score: response.stats.skywars_experience ?? 0,
			info: {
				player: response.player,
				display: response.display,
				queried: Date.now(),
				exp: response.stats.skywars_experience ?? 0,
			},
			siblings: {},
		};

		setLbEntries([...entries, thisPlayerEntry].sort((a, b) => b.score - a.score));
	}, [lbAroundScoreData, response.display, response.player, response.stats.skywars_experience, response.uuid]);

	if (lbAroundScoreLoading) return <Loading></Loading>;
	if (lbAroundScoreError || !lbAroundScoreData) return <div className="text-red-500">Failed to load leaderboard data</div>;
	if (playerScoreLoading) return <Loading></Loading>;
	if (playerScoreError || typeof playerRank !== "number") return <div className="text-red-500">Failed to load player rank</div>;

	if (!lbEntries.length) return <Loading></Loading>;
	const currentPlayerIndex = lbEntries.findIndex((entry: LBEntry) => entry.uuid === response.uuid);
	const startIndex = Math.max(0, currentPlayerIndex - 10);
	const playersAbove = lbEntries;
	const currentPlayerScore = response.stats.skywars_experience ?? 0;

	async function updateStats(targetUuid: string) {
		if (updatingStatsUuid === targetUuid) return;
		setUpdatingStatsUuid(targetUuid);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${targetUuid}`, {
				method: "GET",
			});
			if (!res.ok) {
				throw new Error("Failed to update stats");
			}
			const newResponse: OverallResponse = await res.json();
			const newValue = newResponse.stats.skywars_experience ?? 0;

			setLbEntries((prev) => {
				const updated = prev.map((entry) =>
					entry.uuid === targetUuid
						? {
								...entry,
								score: newValue,
								info: {
									...entry.info,
									queried: Date.now(),
								},
							}
						: entry,
				);

				return updated.sort((a, b) => b.score - a.score);
			});
		} finally {
			setUpdatingStatsUuid(null);
		}
	}

	async function searchForPlayer(playerName: string) {
		const trimmed = playerName.trim();
		if (!trimmed || searching) return;

		setSearchError(null);
		setSearching(true);
		try {
			const uuidRes = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(trimmed)}`);
			if (!uuidRes.ok) {
				setSearchError("Player not found.");
				return;
			}

			const uuidData = await uuidRes.json();
			if (!uuidData?.uuid) {
				setSearchError("Player not found.");
				return;
			}

			window.location.href = `/tools/climber?player=${encodeURIComponent(trimmed)}`;
		} catch {
			setSearchError("Could not validate that player.");
		} finally {
			setSearching(false);
		}
	}

	return (
		<div className="bg-layer rounded-xl p-6 m-0 flex flex-col items-center w-full">
			<h1 className="font-bold mb-2 text-4xl">Leaderboard Climber</h1>
			<span className="font-semibold text-center mb-2 px-3 bg-content rounded-xl p-2">
				Stats of other players can be outdated. Works best for highly ranked players.<br></br>Refreshing will update a player's
				stats and their position on the leaderboard.
			</span>
			<div className="w-80 max-w-xl flex items-center border border-accent rounded-lg gap-3 mx-auto mb-2">
				<Search className="px-2 w-10 h-10" />
				<input
					type="text"
					value={searchInput}
					onChange={(event) => setSearchInput(event.target.value)}
					placeholder="Search another player..."
					className="outline-none w-full p-1 font-semibold"
					onKeyDown={async (event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							await searchForPlayer(searchInput);
						}
					}}
				/>
			</div>
			{searchError ? <span className="text-red-500 text-sm font-semibold mb-2">{searchError}</span> : null}
			<div className="w-full overflow-x-auto rounded-lg my-4">
				<table className="min-w-full text-left bg-content">
					<thead className="text-accent border-b-2 border-accent bg-content">
						<tr>
							<th className="p-2 text-xl">#</th>
							<th className="p-2 text-xl">Level</th>
							<th className="p-2 text-xl">Player</th>
							<th className="p-2 text-xl text-right">Delta</th>
							<th className="p-2 text-xl text-right">EXP</th>
							<th className="p-2 text-xl text-right"></th>
						</tr>
					</thead>
					<tbody>
						{playersAbove.map((entry: LBEntry, idx: number) => {
							const isCurrentPlayer = entry.uuid === response.uuid;
							const isUpdating = updatingStatsUuid === entry.uuid;
							const entryRank = playerRank + (idx - currentPlayerIndex);
							const scoreDelta = typeof currentPlayerScore === "number" ? entry.score - currentPlayerScore : null;
							const mockOverallResponse = {
								...entry.info,
								uuid: entry.uuid,
								stats: {},
								guild: undefined,
								took: 0,
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
							} as any;
							const rank = getPlayerRank(mockOverallResponse);
							const level = calcLevel(entry.info.exp ?? 0);
							const scheme = formatScheme(level, mockOverallResponse, false);
							const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
							const isStale = Date.now() - entry.info.queried > SEVEN_DAYS_MS;

							return (
								<tr
									key={entry.uuid}
									className={["border-b text-xl last:border-b-0", isCurrentPlayer ? "bg-white/10" : ""].join(" ")}
								>
									<td className="p-2">{entryRank}</td>
									<td className="p-2">
										<MinecraftText>{scheme}</MinecraftText>
									</td>
									<td className={`p-2`}>
										<a
											href={`/redirect?uuid=${entry.uuid}`}
											className={isCurrentPlayer ? "font-bold text-accent" : "font-medium"}
										>
											<MinecraftText>{`${rank.prefix} ${entry.info.player}`}</MinecraftText>
										</a>
									</td>
									<td className={["p-2 text-right font-medium", isStale ? "text-red-500" : ""].join(" ")}>
										{scoreDelta === null
											? "n/a"
											: scoreDelta === 0
												? "0"
												: scoreDelta > 0
													? `+${scoreDelta.toLocaleString()}`
													: scoreDelta.toLocaleString()}
									</td>
									<td className={["p-2 text-right font-semibold", isStale ? "text-red-500" : ""].join(" ")}>
										{entry.score.toLocaleString()}
									</td>
									<td className="p-2">
										<div className="flex items-center justify-end gap-2" title="Refresh stats">
											{!isCurrentPlayer ? (
												<button
													type="button"
													className={
														`inline-flex items-center justify-center rounded p-1 text-accent hover:bg-accent/10 transition-colors cursor-pointer ` +
														(isUpdating ? "cursor-not-allowed opacity-70" : "")
													}
													onClick={() => {
														updateStats(entry.uuid);
													}}
													disabled={isUpdating}
													aria-label={`Update stats for ${entry.info.player}`}
												>
													<RefreshCcw className={["w-5 h-5", isUpdating ? "animate-spin" : ""].join(" ")} />
												</button>
											) : (
												<span
													className="inline-flex items-center justify-center rounded p-1 opacity-0"
													aria-hidden="true"
												>
													<RefreshCcw className="w-5 h-5" />
												</span>
											)}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default LeaderboardClimber;
