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
	type: "duplicate_add" | "remove_without_add" | "starts_with_remove" | "out_of_order_remove" | "out_of_order_add";
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
		// For equal timestamps, process removals before adds so we do not create
		// impossible "add before remove" pairings when a state flips instantly.
		if (a.eventType !== b.eventType) return a.eventType === "removed" ? -1 : 1;
		return a.index - b.index;
	});

	const now = Math.floor(Date.now() / 1000);

	const rows: RotationRow[] = [];
	const anomalies: RotationAnomaly[] = [];
	let openRowIndex: number | null = null;
	let expectedNextType: "added" | "removed" = "added";

	for (const event of events) {
		if (event.eventType === "added") {
			if (expectedNextType !== "added") {
				anomalies.push({
					timestamp: event.timestamp,
					type: "out_of_order_add",
					message: "Added event encountered where a remove was expected.",
				});
			}

			if (openRowIndex !== null) {
				anomalies.push({
					timestamp: event.timestamp,
					type: "duplicate_add",
					message: "Added event while map was already active.",
				});

				if (hideAnomalies) {
					// Keep pairing behavior correct by re-basing the open window to the latest add.
					const openRow = rows[openRowIndex];
					openRow.added = event.timestamp;
					openRow.removed = null;
					openRow.daysInRotation = 0;
					openRow.isOngoing = true;
					expectedNextType = "removed";
					continue;
				}

				// Keep the previous unmatched add visible as an anomaly row,
				// then start a fresh active window from the latest add.
				const previousOpenRow = rows[openRowIndex];
				previousOpenRow.removed = null;
				previousOpenRow.daysInRotation = null;
				previousOpenRow.isOngoing = false;

				rows.push({
					added: event.timestamp,
					removed: null,
					daysInRotation: 0,
					isOngoing: true,
				});
				openRowIndex = rows.length - 1;
				expectedNextType = "removed";
				continue;
			}

			rows.push({
				added: event.timestamp,
				removed: null,
				daysInRotation: 0,
				isOngoing: true,
			});
			openRowIndex = rows.length - 1;
			expectedNextType = "removed";
			continue;
		}

		if (expectedNextType !== "removed") {
			anomalies.push({
				timestamp: event.timestamp,
				type: openRowIndex === null ? "starts_with_remove" : "out_of_order_remove",
				message:
					openRowIndex === null
						? "First event is a remove; sequence should start with an add."
						: "Removed event encountered where an add was expected.",
			});
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
		expectedNextType = "added";
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
	const [hideAnomalies, setHideAnomalies] = React.useState(false);
	const rotationData = mapData ? buildRotationRows(mapData.map.added, mapData.map.removed, hideAnomalies) : { rows: [], anomalies: [] };
	const rotationRows = rotationData.rows;

	const headerClass = "p-2 text-l lg:text-xl select-none whitespace-nowrap";

	if (isMapLoading) {
		return (
			<div className="flex flex-col p-4">
				<h1 className="text-4xl font-bold text-center my-2">Map Details</h1>
				<div className="w-full overflow-x-auto rounded-xl lg:p-8 h-200" />
			</div>
		);
	}

	if (mapError) {
		return (
			<div className="flex flex-col p-4">
				<h1 className="text-4xl font-bold text-center my-2">Map Details</h1>
				<div className="w-full overflow-x-auto rounded-xl lg:p-8 h-200" />
			</div>
		);
	}

	return (
		<div className="flex flex-col p-4">
			<h1 className="text-4xl font-bold text-center my-2">{mapData?.map.map_name ?? "Map Details"}</h1>
			<span className="font-semibold text-center mb-2 px-3">Rotation history for this map</span>

			{mapData && (
				<>
					{/* Map image */}
					<div className="px-4 lg:px-8 pb-8">
						<img
							src={`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/image?q=large&name=${encodeURIComponent(params.get("mapName") || "")}`}
							alt={`${mapData.map.map_name} image`}
							className="w-full rounded-t-lg"
						/>
						<table className="w-150 lg:w-full bg-content rounded-b-lg">
							<tbody>
								<tr>
									<td className="p-2 font-semibold text-lg text-accent">Last Change</td>
									<td className="p-2 font-semibold text-lg">{timeAgo(mapData.map.last_change)}</td>
									<td className="p-2 font-semibold text-lg">
										<span
											className={`px-3 py-1 rounded-full font-semibold ${
												mapData.map.last_status ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
											}`}
										>
											{mapData.map.last_status ? "Active" : "Inactive"}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Rotation table */}
					<div className="w-full overflow-x-auto rounded-xl lg:p-8">
						<table className="w-150 lg:w-full bg-content rounded-lg">
							<thead className="text-left text-accent border-b-2">
								<tr>
									<th className={headerClass}>Added</th>
									<th className={headerClass}>In Rotation</th>
									<th className={headerClass}>Removed</th>
								</tr>
							</thead>
							<tbody>
								{rotationRows.map((row, i) => (
									<tr key={i} className={row.daysInRotation == null ? "bg-red-900/30" : ""}>
										<td className="p-2 font-semibold text-lg">
											{row.added ? new Date(row.added * 1000).toLocaleString() : "-"}
										</td>
										<td className="p-2 font-semibold text-lg">
											{row.daysInRotation === null
												? "-"
												: row.isOngoing
													? `${row.daysInRotation} days (ongoing)`
													: `${row.daysInRotation} days`}
										</td>
										<td className="p-2 font-semibold text-lg">
											{row.removed ? new Date(row.removed * 1000).toLocaleString() : "-"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Controls */}
					{/* <div className="flex justify-center mb-4">
						<label htmlFor="hideAnomalies" className="flex items-center gap-2 font-semibold cursor-pointer">
							<input
								type="checkbox"
								id="hideAnomalies"
								checked={hideAnomalies}
								onChange={() => setHideAnomalies(!hideAnomalies)}
							/>
							Hide anomalies
						</label>
					</div> */}
					{/* Anomalies */}
					{rotationData.anomalies.length > 0 && (
						<div className="mx-4 lg:mx-8 mb-4 rounded-md border border-yellow-500 bg-yellow-950/30 p-4 text-yellow-100">
							<p className="font-semibold mb-2">Potential Misaligned Datapoints</p>
							<ul className="list-disc pl-5 space-y-1">
								{rotationData.anomalies.map((anomaly, i) => (
									<li key={`${anomaly.type}-${anomaly.timestamp}-${i}`}>
										{new Date(anomaly.timestamp * 1000).toLocaleString()} — {anomaly.message}
									</li>
								))}
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
};

const MapPage = () => (
	<Suspense fallback={<div>Loading map details...</div>}>
		<MapPageContent />
	</Suspense>
);

export default MapPage;
