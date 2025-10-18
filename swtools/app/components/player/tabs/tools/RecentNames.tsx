"use client";
import { fetcher, timeAgo } from "@/app/utils/Utils";
import useSWR from "swr";
import { useState } from "react";
import { Tooltip } from "@mui/material";

type Snapshot = {
	queried: number;
	player: string;
};

type SnapshotKeysResponse = {
	uuid: string;
	player: string;
	data: Snapshot[];
};

const RecentNames: React.FC<{ uuid: string }> = ({ uuid }) => {
	const [fetchUrl, setFetchUrl] = useState<string | null>(null);
	const { data, error, isLoading } = useSWR<SnapshotKeysResponse>(fetchUrl, fetchUrl ? fetcher : null, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const handleFetch = () => {
		setFetchUrl(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/snapshotKeys?player=${uuid}`);
	};

	// Helper to extract name changes in chronological order (oldest to newest)
	const getNameChanges = (snapshots: Snapshot[]) => {
		const changes: { player: string; queried: number }[] = [];
		let lastName: string | null = null;
		// Go oldest to newest
		for (const snap of [...snapshots].reverse()) {
			if (snap.player !== lastName) {
				changes.push({ player: snap.player, queried: snap.queried });
				lastName = snap.player;
			}
		}
		return changes.reverse(); // So most recent change is last
	};

	return (
		<div className="bg-layer rounded-xl p-6 m-0 flex flex-col items-center w-full lg:w-90 aspect-square">
			<div className="font-bold mb-2 text-2xl">Recent Names</div>
			<button
				className="bg-button text-white px-4 py-2 rounded mb-4 animate-press cursor-pointer"
				onClick={handleFetch}
				disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Get Recent Names"}
			</button>
			{fetchUrl && (
				<>
					{isLoading && <div>Loading recent names...</div>}
					{error || (data && !data.data) ? (
						<div>Failed to load recent names.</div>
					) : (
						data && (
							<div className="max-h-60 overflow-y-auto w-full">
								<table className="w-full text-sm mb-2">
									<thead>
										<tr className="border-b-2">
											<th className="text-left px-2 py-1">Name</th>
											<th className="text-left px-2 py-1">First Seen</th>
											<th className="text-left px-2 py-1">Time Ago</th>
										</tr>
									</thead>
									<tbody>
										{getNameChanges(data.data)
											.slice(-5)
											.map((change, idx) => (
												<tr key={idx} className="border-b">
													<td className="px-2 py-1">{change.player}</td>
													<td className="px-2 py-1">{new Date(change.queried).toLocaleDateString()}</td>
													<td className="px-2 py-1">
														{timeAgo(change.queried / 1000, {
															showSeconds: false,
															showMinutes: false,
															showHours: true,
															showDays: true,
															showYears: true,
														})}
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						)
					)}
					<Tooltip title="Only includes names that occur in saved snapshots of this player (UUID).">
						<p className="text-sm text-center text-gray-400 mt-4">History might not be accurate.</p>
					</Tooltip>
				</>
			)}
		</div>
	);
};

export default RecentNames;
