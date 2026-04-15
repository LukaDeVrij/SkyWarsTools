"use client";

import React from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { ArrowBigLeft, ArrowBigRight, LoaderCircle } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import ErrorView from "@/app/components/universal/ErrorView";
import MinecraftText from "@/app/utils/MinecraftText";
import { keys } from "@/app/utils/LeaderboardKeys";
import { getPlayerRank } from "@/app/utils/RankTag";
import { calcLevel, fetcher, formatPlaytime, formatTimestampShort, formatTimestampToVerboseDate, shortenUUID } from "@/app/utils/Utils";
import { OverallResponse } from "@/app/types/OverallResponse";
import { WeeklyComparisonEntry, WeeklyComparisonResponse } from "@/app/types/WeeklyComparison";

const WEEKLY_MAX_ENTRIES = 200;

const Page = () => {
	const params = useParams();
	const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;
	const weekParam = searchParams?.get("week")?.trim() || "";
	const isLatest = !weekParam;
	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
	const [weekInput, setWeekInput] = React.useState<string>(weekParam);

	const key = String(params.key || "");
	const statInfo = key ? keys.find((k) => k.value === key) : undefined;

	const endpoint = `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getWeeklyComparison/${key}${
		weekParam ? `?week=${encodeURIComponent(weekParam)}` : ""
	}`;

	const { data, error, isLoading } = useSWR<WeeklyComparisonResponse>(endpoint, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const parsedCurrentWeek = Number.parseInt(data?.week ?? "", 10);
	const hasNumericWeek = Number.isFinite(parsedCurrentWeek);

	React.useEffect(() => {
		setWeekInput(weekParam);
	}, [weekParam]);

	const updateWeekQuery = (week?: number) => {
		if (!Number.isFinite(week) || (week ?? 0) < 1) {
			setErrorMsg("Week must be 1 or greater.");
			return;
		}

		window.location.search = `?week=${week}`;
	};

	const entries = [...(data?.entries ?? [])]
		.sort((a, b) => {
			if (b.delta !== a.delta) return b.delta - a.delta;
			return b.current - a.current;
		})
		.slice(0, WEEKLY_MAX_ENTRIES);

	if (isLoading) {
		return (
			<div className="w-full lg:w-3/4 mx-auto flex flex-col items-center justify-center align-center mt-10">
				<LoaderCircle className="animate-spin w-50 h-50" />
				<p className="font-semibold px-4 text-center">
					Fetching weekly comparison.<br></br>This might take a bit.
				</p>
			</div>
		);
	}

	if (error) {
		return <ErrorView statusCode={404} statusText="Could not get that weekly comparison" />;
	}

	if (!data?.entries) {
		return <ErrorView statusCode={400} statusText="Weekly comparison has no players?!" />;
	}

	return (
		<>
			<div className="flex flex-col lg:flex-row items-center justify-center gap-2 mb-4">
				<div className="flex items-center gap-2 bg-content rounded-lg p-1 px-2">
					<button
						className="px-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
						disabled={!hasNumericWeek || parsedCurrentWeek <= 1}
						onClick={() => {
							if (!hasNumericWeek) return;
							updateWeekQuery(parsedCurrentWeek - 1);
						}}
					>
						<ArrowBigLeft></ArrowBigLeft>
					</button>
					<span className="font-semibold text-base lg:text-lg bg-layer px-3 rounded-xl">
						{isLatest ? `Latest (Week ${data.week})` : `Week ${data.week}`}
					</span>
					<button
						className="px-1 rounded bg-layer text-content font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
						disabled={!hasNumericWeek}
						onClick={() => {
							if (!hasNumericWeek) return;
							updateWeekQuery(parsedCurrentWeek + 1);
						}}
					>
						<ArrowBigRight></ArrowBigRight>
					</button>
				</div>
				<div className="flex items-center border border-accent rounded-lg gap-2 h-10 px-2 w-64">
					<input
						type="number"
						min={1}
						placeholder="Go to week..."
						value={weekInput}
						className="outline-none w-full p-1 font-semibold"
						onChange={(e) => setWeekInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key !== "Enter") return;
							const parsedWeek = Number.parseInt(weekInput, 10);
							if (!Number.isFinite(parsedWeek)) {
								setErrorMsg("Enter a valid week number.");
								return;
							}
							setErrorMsg(null);
							updateWeekQuery(parsedWeek);
						}}
					/>
					<button
						className="px-2 rounded bg-button text-main font-bold cursor-pointer"
						onClick={() => {
							const parsedWeek = Number.parseInt(weekInput, 10);
							if (!Number.isFinite(parsedWeek)) {
								setErrorMsg("Enter a valid week number.");
								return;
							}
							setErrorMsg(null);
							updateWeekQuery(parsedWeek);
						}}
					>
						Go
					</button>
				</div>
				{/* <button
					className="px-3 h-10 rounded-lg bg-layer text-content font-bold cursor-pointer"
					onClick={() => {
						setWeekInput("");
						setErrorMsg(null);
						window.location.search = "";
					}}
				>
					Latest
				</button> */}
			</div>

			<div className="flex items-center rounded-lg mx-auto p-1">
				{errorMsg && <span className="text-red-500 font-semibold">{errorMsg}</span>}
			</div>

			<div className="w-full mx-auto flex flex-col items-center justify-center gap-0">
				<div className="w-full flex flex-row items-end justify-between">
					<h2 className="text-2xl font-bold text-center text-accent pt-2 px-6 rounded-t-xl bg-content w-fit">
						{statInfo?.name ?? key}
					</h2>
					<div className="flex items-center gap-3 bg-content p-2 px-3 rounded-t-xl">
						<span className="font-semibold text-sm lg:text-base">
							{formatTimestampShort(new Date(Date.parse(data.generatedAt) - 604800000))} -{" "}
							{formatTimestampShort(new Date(Date.parse(data.generatedAt)))}
						</span>
					</div>
				</div>

				<div className="w-full overflow-x-auto rounded-b-lg">
					<table className="min-w-full w-190 lg:w-full bg-content rounded-b-lg">
						<thead className="text-left text-accent border-b-2">
							<tr>
								<th className="p-2 lg:py-2 text-l lg:text-xl">#</th>
								<th className="p-1 lg:py-2 text-l lg:text-xl">Level</th>
								<th className="p-1 lg:py-2 text-l lg:text-xl">Player</th>
								<th className="p-1 lg:py-2 text-l lg:text-xl">Weekly Delta</th>
							</tr>
						</thead>
						<tbody>
							{entries.map((entry: WeeklyComparisonEntry, index: number) => {
								const rankClass =
									index + 1 === 1
										? "text-yellow-400"
										: index + 1 === 2
											? "text-gray-300"
											: index + 1 === 3
												? "text-orange-700"
												: "";

								const mockOverallResponse: OverallResponse = {
									took: 0,
									nextSave: { saved: true, lastSaved: 0 },
									player: entry.player,
									uuid: entry.uuid,
									queried: 0,
									stats: { networkExp: 0, firstLogin: 0 },
									guild: {},
									display: entry.display,
								};
								const rank = getPlayerRank(mockOverallResponse);
								const levelString = entry.display.levelFormattedWithBrackets ?? "§7[§70✯§7]§r ";
								const fullName = `${rank.prefix} ${entry.player}`;

								return (
									<tr key={entry.uuid} className="border-b last:border-b-0 hover:bg-accent/10 transition-colors relative">
										<td className={`p-2 lg:py-2 text-l lg:text-xl relative z-2 ${rankClass}`}>{index + 1}</td>
										<td className="p-1 lg:py-2 text-l lg:text-xl relative z-2">
											<MinecraftText>{levelString}</MinecraftText>
										</td>
										<td className="p-1 lg:py-2 text-l lg:text-xl relative z-2">
											<a href={`/redirect?uuid=${shortenUUID(entry.uuid)}`}>
												<MinecraftText>{fullName}</MinecraftText>
											</a>
										</td>
										<td className="p-1 lg:py-2 text-l lg:text-xl relative z-2 text-green-300 font-semibold">
											<Tooltip
												title={
													key == "skywars_experience"
														? "From " +
															calcLevel(entry.previous).toFixed(3) +
															" to " +
															calcLevel(entry.current).toFixed(3)
														: entry.delta.toLocaleString()
												}
											>
												<span>
													{key == "time_played" ? formatPlaytime(entry.delta) : entry.delta.toLocaleString()}
												</span>
											</Tooltip>
											{key === "time_played" && (
												<span className="text-base text-gray-400 ml-1">
													({(((entry.delta * 1000) / 604800000) * 100).toFixed(1)}%)
												</span>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Page;
