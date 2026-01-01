import { KitStats } from "@/app/types/KitStats";
import { OverallResponse } from "@/app/types/OverallResponse";
import { formatPlaytime, getKitPrestigeInfo, parseKitStatsKey } from "@/app/utils/Utils";
import React, { useState } from "react";

interface KitsUniversalTableProps {
	kitData: { [key: string]: OverallResponse["stats"][keyof OverallResponse["stats"]] };
}

const KitsUniversalTable: React.FC<KitsUniversalTableProps> = ({ kitData }) => {
	const kitStats: { [key: string]: KitStats } = {};

	Object.keys(kitData).forEach((key) => {
		const kit = parseKitStatsKey(key);
		if (!kitStats[kit.kit]) {
			kitStats[kit.kit] = {
				wins: 0,
				losses: 0,
				kills: 0,
				deaths: 0,
				xp: 0,
			};
		}
		if (key.startsWith("wins_")) {
			kitStats[kit.kit].wins = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("losses_")) {
			kitStats[kit.kit].losses = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("kills_")) {
			kitStats[kit.kit].kills = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("deaths_")) {
			kitStats[kit.kit].deaths = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("xp_")) {
			kitStats[kit.kit].xp = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("time_played_")) {
			kitStats[kit.kit].timePlayed = (kitData[key] as number) ?? 0;
		}
	});

	// Idea was good, to exclude some stats from mini - problem is it looks ass. So for now ill just keep all table columns
	// const isMini = Object.keys(kitData)[0]?.includes("_mini_") ?? false;
	// console.log(isMini);
	const isMini = false;

	const [sortKey, setSortKey] = useState<keyof KitStats | "kit" | "wlr" | "kdr">("kit");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const handleSort = (key: keyof KitStats | "kit" | "wlr" | "kdr") => {
		if (sortKey === key) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("desc");
		}
	};

	const getWLR = (stats: KitStats) =>
		stats.losses === 0 ? (stats.wins ?? 0 > 0 ? Infinity : 0) : (stats.wins ?? 0) / (stats.losses ?? 1);
	const getKDR = (stats: KitStats) =>
		stats.deaths === 0 ? (stats.kills ?? 0 > 0 ? Infinity : 0) : (stats.kills ?? 0) / (stats.deaths ?? 1);

	const sortedEntries = Object.entries(kitStats).sort(([kitA, statsA], [kitB, statsB]) => {
		let a: number | string = 0;
		let b: number | string = 0;
		if (sortKey === "kit") {
			a = kitA.toLowerCase();
			b = kitB.toLowerCase();
		} else if (sortKey === "wlr") {
			a = getWLR(statsA);
			b = getWLR(statsB);
		} else if (sortKey === "kdr") {
			a = getKDR(statsA);
			b = getKDR(statsB);
		} else {
			a = statsA[sortKey] ?? 0;
			b = statsB[sortKey] ?? 0;
		}

		if (typeof a === "string" && typeof b === "string") {
			return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
		} else {
			return sortOrder === "asc" ? (a as number) - (b as number) : (b as number) - (a as number);
		}
	});

	const renderSortArrow = (key: keyof KitStats | "kit" | "wlr" | "kdr") => (sortKey === key ? (sortOrder === "asc" ? " ▲" : " ▼") : "");

	const mega = Object.keys(kitData)[0]?.includes("_mega_") ?? false;

	return (
		<>
			<span className="lg:hidden text-sm text-center px-2 text-gray-300">On mobile? You can horizontally scroll the table!</span>
			<div className="overflow-x-auto lg:overflow-x-hidden">
				<table className="w-150 lg:w-full text-left bg-content m-1 lg:m-3">
					<thead className="text-accent">
						<tr>
							<th onClick={() => handleSort("kit")} style={{ cursor: "pointer" }}>
								Kit{renderSortArrow("kit")}
							</th>
							<th onClick={() => handleSort("wins")} style={{ cursor: "pointer" }}>
								Wins{renderSortArrow("wins")}
							</th>
							{!isMini && (
								<>
									<th onClick={() => handleSort("losses")} style={{ cursor: "pointer" }}>
										Losses{renderSortArrow("losses")}
									</th>
									<th onClick={() => handleSort("wlr")} style={{ cursor: "pointer" }}>
										W/L{renderSortArrow("wlr")}
									</th>
								</>
							)}

							<th onClick={() => handleSort("kills")} style={{ cursor: "pointer" }}>
								Kills{renderSortArrow("kills")}
							</th>
							{!isMini && (
								<>
									<th onClick={() => handleSort("deaths")} style={{ cursor: "pointer" }}>
										Deaths{renderSortArrow("deaths")}
									</th>
									<th onClick={() => handleSort("kdr")} style={{ cursor: "pointer" }}>
										K/D{renderSortArrow("kdr")}
									</th>
								</>
							)}

							<th onClick={() => handleSort("xp")} style={{ cursor: "pointer" }}>
								XP{renderSortArrow("xp")}
							</th>
							<th onClick={() => handleSort("timePlayed")} style={{ cursor: "pointer" }}>
								Playtime{renderSortArrow("timePlayed")}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedEntries.map(([kitName, stats]) => {
							const wlr: number =
								stats.losses === 0 ? (stats.wins ?? 0 > 0 ? Infinity : 0) : (stats.wins ?? 0) / (stats.losses ?? 0);
							const kdr: number =
								stats.deaths === 0 ? (stats.kills ?? 0 > 0 ? Infinity : 0) : (stats.kills ?? 0) / (stats.deaths ?? 0);
							return (
								<tr key={kitName} className="border-b-1 border-white">
									<td>{kitName}</td>
									<td>{(stats.wins ?? 0).toLocaleString()}</td>
									{!isMini && (
										<>
											<td>{(stats.losses ?? 0).toLocaleString()}</td>
											<td className={wlr > 1 ? "text-green-600" : ""}>{wlr.toFixed(2)}</td>
										</>
									)}
									<td>{(stats.kills ?? 0).toLocaleString()}</td>
									{!isMini && (
										<>
											<td>{(stats.deaths ?? 0).toLocaleString()}</td>
											<td className={kdr > 5 ? "text-green-600" : ""}>{kdr.toFixed(2)}</td>
										</>
									)}
									<td title={getKitPrestigeInfo(stats.xp ?? 0, mega).name}>{(stats.xp ?? 0).toLocaleString()}</td>
									<td id={stats.timePlayed !== undefined ? stats.timePlayed.toString() : undefined}>
										{stats.timePlayed ? `${formatPlaytime(stats.timePlayed)}` : "0m"}
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

export default KitsUniversalTable;
