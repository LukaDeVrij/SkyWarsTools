"use client";
import { fetcher } from "@/app/utils/Utils";
import React from "react";
import useSWR from "swr";

interface WeeklyRanksProps {
	uuid: string;
}

interface WeeklyRanksResponse {
	shortenedUUID: string;
	topWeeklyRanks: {
		_id: string;
		uuid: string;
		__v: number;
		createdAt: string;
		records: Array<{
			week: string;
			stat: string;
			rank: number;
			value: number;
			_id: string;
		}>;
		updatedAt: string;
	};
}

const MEDALS = {
	1: { label: "#1", sublabel: "Gold", accent: "#c8a84b", border: "border-t-2 border-t-[#c8a84b]" },
	2: { label: "#2", sublabel: "Silver", accent: "#9aa4b0", border: "border-t-2 border-t-[#9aa4b0]" },
	3: { label: "#3", sublabel: "Bronze", accent: "#b87b4a", border: "border-t-2 border-t-[#b87b4a]" },
} as const;

const RANK_WEIGHT = { 1: 3, 2: 2, 3: 1 } as const;

const formatStat = (stat: string): string => {
	const map: Record<string, string> = {
		kills: "Kills",
		wins: "Wins",
		skywars_experience: "XP",
		heads: "Heads",
		time_played: "Playtime",
	};
	return map[stat] ?? stat;
};

const WeeklyRanks: React.FC<WeeklyRanksProps> = ({ uuid }) => {
	const { data, error, isLoading } = useSWR<WeeklyRanksResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/topWeeklyRanks?uuid=${encodeURIComponent(uuid)}`,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false, shouldRetryOnError: false },
	);

	const [openCard, setOpenCard] = React.useState<string | null>(null);

	const records = data?.topWeeklyRanks?.records ?? [];

    // magic
	const grouped = records.reduce<Record<string, Record<number, { week: string; value: number }[]>>>((acc, r) => {
		if (r.rank > 3) return acc;
		if (!acc[r.stat]) acc[r.stat] = {};
		if (!acc[r.stat][r.rank]) acc[r.stat][r.rank] = [];
		acc[r.stat][r.rank].push({ week: r.week, value: r.value });
		return acc;
	}, {});

	const cards = Object.entries(grouped)
		.flatMap(([stat, ranks]) =>
			Object.entries(ranks).map(([rank, weeks]) => ({
				stat,
				rank: Number(rank) as 1 | 2 | 3,
				weeks,
				prestige: weeks.length * RANK_WEIGHT[Number(rank) as 1 | 2 | 3],
			})),
		)
		.sort((a, b) => b.prestige - a.prestige);

	if (isLoading)
		return (
			<div className="flex gap-2 overflow-hidden">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="h-24 w-40 shrink-0 animate-pulse rounded-lg bg-layer" />
				))}
			</div>
		);

	if (error || cards.length === 0) return null;

	return (
		<div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 pb-0 bg-content">
			<div className="flex gap-2">
				{cards.map(({ stat, rank, weeks }) => {
					const medal = MEDALS[rank];
					const key = `${stat}-${rank}`;
					const isOpen = openCard === key;

					return (
						<div key={key} className="flex w-40 shrink-0 flex-col">
							<button
								onClick={() => setOpenCard(isOpen ? null : key)}
								className={[
									"flex cursor-pointer h-24 w-full flex-col items-start rounded-lg bg-layer p-3 text-left transition-colors hover:brightness-110",
									medal.border,
								].join(" ")}
							>
								{isOpen ? (
									<div className="flex flex-col rounded-lg bg-layer justify-between w-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]">
										{weeks.map((w, i) => (
											<div
												key={w.week}
												className={`w-full flex items-center justify-between py-1 text-sm ${
													i < weeks.length - 1 ? "border-b border-[#1a2535]" : ""
												}`}
											>
												<span className="text-[#6b8299]">{w.week}</span>
												<span className="font-bold text-[#e2eaf2]">
													{parseInt(w.value.toString()).toLocaleString()}
												</span>
											</div>
										))}
									</div>
								) : (
									<>
										<div className="flex w-full items-center justify-between">
											<span className="truncate text-xs font-bold uppercase" style={{ color: medal.accent }}>
												{medal.label} WEEKLY {formatStat(stat)}
											</span>
										</div>
										<div className="mt-auto text-2xl font-bold leading-none text-white">{weeks.length}x</div>
										<div className="mt-1 text-xs text-white">time{weeks.length !== 1 ? "s" : ""} achieved</div>
									</>
								)}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WeeklyRanks;
