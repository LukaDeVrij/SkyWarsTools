"use client";
import { useMapRotationMap } from "@/app/hooks/useMapRotation";
import { timeAgo } from "@/app/utils/Utils";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const MapPageContent = () => {
	const params = useSearchParams();
	const { mapData, mapError, isMapLoading } = useMapRotationMap(params.get("mapName") || "");
	return (
		<div>
			<h1>Map Rotation Map Details</h1>
			{isMapLoading && <div>Loading map details...</div>}
			{mapError && <div>Error loading map details.</div>}
			{mapData && (
				<div className="flex flex-col items-center justify-center min-h-screen  p-6">
					<div className="w-full max-w-2xl bg-content rounded-lg shadow-md p-8">
						<h2 className="text-3xl font-bold mb-6 text-gray-100">{mapData.map.map_name}</h2>
						<div className="overflow-x-auto mb-6">
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-blue-500 text-white">
										<th className="border px-4 py-2 text-left font-semibold">Added</th>
										<th className="border px-4 py-2 text-left font-semibold">Removed</th>
									</tr>
								</thead>
								<tbody>
									{mapData.map.added.map((add, i) => (
										<tr key={i} className="hover:bg-gray-800 transition-colors">
											<td className="border border-gray-300 px-4 py-2 text-white">
												{new Date(add * 1000).toLocaleString()}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-white">
												{mapData.map.removed[i] ? new Date(mapData.map.removed[i] * 1000).toLocaleString() : "-"}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="space-y-3 text-white">
							<p className="text-lg">
								<span className="font-semibold">Last Change:</span>{" "}
								{new Date(mapData.map.last_change * 1000).toLocaleString()}{" "}
                                ({timeAgo(mapData.map.last_change)})
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
