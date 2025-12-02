"use client";
import { UUIDResponse } from "@/app/types/UUIDResponse";
import { Tooltip } from "@mui/material";
import { Search } from "lucide-react";
import React from "react";

interface PlayerVersusSearchProps {
	player: string;
}

const PlayerVersusSearch = ({ player }: PlayerVersusSearchProps) => {
	const [errorMsg, setError] = React.useState<string | null>(null);
	return (
		<div className="flex float-right items-center bg-layer rounded-md border border-border hover:border-accent transition-all relative">
			<Search className="px-2 w-10 h-10" />
			<input
				placeholder="Search an opponent..."
				className="outline-none w-full p-1 font-semibold"
				onKeyDown={async (e) => {
					if (e.key === "Enter") {
						const playerName = (e.target as HTMLInputElement).value.trim();
						if (!playerName) return;
						if (playerName.length > 16) {
							setError("Player name too long.");
							return;
						}
						if (playerName.toLowerCase() == player.toLowerCase()) {
							setError("You cannot versus yourself silly!");
							return;
						}
						try {
							const uuidRes = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${playerName}`);
							if (!uuidRes.ok) {
								setError("Player not found.");
								return;
							}
							const uuidData: UUIDResponse = await uuidRes.json();
							const uuid = uuidData?.uuid;
							const correctedName = uuidData?.name;
							if (!uuid) {
								setError("Player not found.");
								return;
							}

							window.location.href = `?vs=${correctedName}`;
						} catch (err: unknown) {
							setError("An error occurred.");
							console.error(err);
						}
					}
				}}
			/>
			<div className="absolute right-2 flex items-center h-full pointer-events-none">
				{errorMsg && (
					<Tooltip title={errorMsg}>
						<div>
							<svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" />
								<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" />
							</svg>
						</div>
					</Tooltip>
				)}
			</div>
		</div>
	);
};

export default PlayerVersusSearch;
