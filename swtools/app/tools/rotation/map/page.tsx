"use client";
import { useMapRotationMap } from "@/app/hooks/useMapRotation";
import { timeAgo } from "@/app/utils/Utils";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

type RotationRow = {
	added: number | null;
	removed: number | null;
	daysInRotation: number | null;
	isOngoing: boolean;
};

type RotationAnomaly = {
	timestamp: number;
	type: "duplicate_add" | "remove_without_add";
	message: string;
};

type RotationBuildResult = {
	rows: RotationRow[];
	anomalies: RotationAnomaly[];
};

const secondsPerDay = 24 * 60 * 60;

const buildRotationRows = (added: number[], removed: number[], hideAnomalies: boolean = true): RotationBuildResult => {
	const events = [
		...added.map((timestamp, index) => ({ timestamp, eventType: "added" as const, index })),
		...removed.map((timestamp, index) => ({ timestamp, eventType: "removed" as const, index })),
	].sort((a, b) => {
		if (a.timestamp !== b.timestamp) return a.timestamp - b.timestamp;
		if (a.eventType !== b.eventType) return a.eventType === "added" ? -1 : 1;
		return a.index - b.index;
	});

	const now = Math.floor(Date.now() / 1000);

	const rows: RotationRow[] = [];
	const anomalies: RotationAnomaly[] = [];
	let openRowIndex: number | null = null;

	for (const event of events) {
		if (event.eventType === "added") {
			if (openRowIndex !== null) {
				anomalies.push({
					timestamp: event.timestamp,
					type: "duplicate_add",
					message: "Added event while map was already active.",
				});
				if (hideAnomalies) continue;

				rows.push({
					added: event.timestamp,
					removed: null,
					daysInRotation: null,
					isOngoing: false,
				});
				continue;
			}

			rows.push({
				added: event.timestamp,
				removed: null,
				daysInRotation: 0,
				isOngoing: true,
			});
			openRowIndex = rows.length - 1;
			continue;
		}

		if (openRowIndex === null) {
			anomalies.push({
				timestamp: event.timestamp,
				type: "remove_without_add",
				message: "Removed event without a matching previous add.",
			});
			if (!hideAnomalies) {
				rows.push({
					added: null,
					removed: event.timestamp,
					daysInRotation: null,
					isOngoing: false,
				});
			}
			continue;
		}

		const openRow = rows[openRowIndex];
		if (openRow.added === null) {
			openRowIndex = null;
			continue;
		}
		openRow.removed = event.timestamp;
		openRow.isOngoing = false;
		openRow.daysInRotation = Math.max(0, Math.floor((event.timestamp - openRow.added) / secondsPerDay));
		openRowIndex = null;
	}

	if (openRowIndex !== null) {
		const openRow = rows[openRowIndex];
		if (openRow.added === null) {
			return { rows, anomalies };
		}
		openRow.daysInRotation = Math.max(0, Math.floor((now - openRow.added) / secondsPerDay));
	}

	return { rows, anomalies };
};

const MapPageContent = () => {
	const params = useSearchParams();
	const { mapData, mapError, isMapLoading } = useMapRotationMap(params.get("mapName") || "");
	const [hideAnomalies, setHideAnomalies] = React.useState(true);
	const rotationData = mapData ? buildRotationRows(mapData.map.added, mapData.map.removed, hideAnomalies) : { rows: [], anomalies: [] };
	const rotationRows = rotationData.rows;

	return (
		<div>
			<h1>Map Rotation Map Details</h1>
			{isMapLoading && <div>Loading map details...</div>}
			{mapError && <div>Error loading map details.</div>}
			{mapData && (
				<div className="flex flex-col items-center justify-center min-h-screen  p-6">
					<label htmlFor="hideAnomalies" className="mb-4 text-white flex items-center gap-2">
						<input
							type="checkbox"
							id="hideAnomalies"
							checked={hideAnomalies}
							onChange={() => setHideAnomalies(!hideAnomalies)}
						/>
						Hide anomalies
					</label>
					<div className="w-full max-w-2xl bg-content rounded-lg shadow-md p-8">
						<h2 className="text-3xl font-bold mb-6 text-gray-100">{mapData.map.map_name}</h2>
						<div className="overflow-x-auto mb-6">
							<table className="w-full border-collapse table-fixed">
								<thead>
									<tr className="bg-blue-500 text-white">
										<th className="border px-4 py-2 text-left font-semibold">Added</th>
										<th className="border px-4 py-2 text-left font-semibold">In Rotation</th>
										<th className="border px-4 py-2 text-left font-semibold">Removed</th>
									</tr>
								</thead>
								<tbody>
									{rotationRows.map((row, i) => (
										<tr key={i} className="hover:bg-gray-800 transition-colors">
											<td
												className={
													"border border-gray-300 px-4 py-2 text-white align-top" +
													(row.daysInRotation == null ? " bg-red-900/50" : "")
												}
											>
												{row.added ? new Date(row.added * 1000).toLocaleString() : "-"}
											</td>
											<td
												className={
													"border border-gray-300 px-4 py-2 text-white align-top" +
													(row.daysInRotation == null ? " bg-red-900/50" : "")
												}
											>
												{row.daysInRotation === null
													? "-"
													: row.isOngoing
														? `${row.daysInRotation} days (ongoing)`
														: `${row.daysInRotation} days`}
											</td>
											<td
												className={
													"border border-gray-300 px-4 py-2 text-white align-top" +
													(row.daysInRotation == null ? " bg-red-900/50" : "")
												}
											>
												{row.removed ? new Date(row.removed * 1000).toLocaleString() : "-"}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{rotationData.anomalies.length > 0 && (
							<div className="mb-6 rounded-md border border-yellow-500 bg-yellow-950/30 p-4 text-yellow-100">
								<p className="font-semibold mb-2">Potential Misaligned Datapoints</p>
								<ul className="list-disc pl-5 space-y-1">
									{rotationData.anomalies.map((anomaly, i) => (
										<li key={`${anomaly.type}-${anomaly.timestamp}-${i}`}>
											{new Date(anomaly.timestamp * 1000).toLocaleString()} - {anomaly.message}
										</li>
									))}
								</ul>
							</div>
						)}
						<div className="space-y-3 text-white">
							<p className="text-lg">
								<span className="font-semibold">Last Change:</span>{" "}
								{new Date(mapData.map.last_change * 1000).toLocaleString()} ({timeAgo(mapData.map.last_change)})
							</p>
							<p className="text-lg">
								<span className="font-semibold">Last Status:</span>{" "}
								<span
									className={`px-3 py-1 rounded-full font-semibold ${mapData.map.last_status ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
								>
									{mapData.map.last_status ? "Active" : "Inactive"}
								</span>
							</p>
						</div>
						<div className="mt-6">
							<img
								src={`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/image?name=${encodeURIComponent(params.get("mapName") || "")}`}
								alt={`${mapData.map.map_name} image`}
								className="w-full rounded-md shadow-md"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const MapPage = () => {
	return (
		<Suspense fallback={<div>Loading map details...</div>}>
			<MapPageContent />
		</Suspense>
	);
};

export default MapPage;
