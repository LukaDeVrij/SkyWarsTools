import React from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";

type QueryStats = {
	weekKey: string;
	stats: StatEntry[];
};
type StatEntry = {
	value: string;
	score: number;
};

const FreqPlayerList = () => {
	const { data, error, isLoading } = useSWR<QueryStats>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/queryStats`, fetcher);

	return (
		<>
			
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{isLoading && <LoaderCircle className="animate-spin"></LoaderCircle>}
				{error && <div>Could not get popular players ):</div>}
				{!isLoading &&
					!error &&
					data &&
					data.stats.slice(0, 3).map((entry: StatEntry, index: number) => (
						<a
							key={index}
							className="flex items-center gap-3 lg:gap-4 bg-content rounded-md p-1 lg:p-2 w-full text-xl animate-press"
							href={`/player/${entry.value}/stats`}
							id={entry.score.toString()}
						>
							<Image
								src={`https://www.mc-heads.net/avatar/${entry.value}`}
								alt={entry.value}
								width={40}
								height={40}
								className="rounded"
							/>
							<div className="min-w-0">
								<div className="font-semibold truncate max-w-[225px]">{entry.value}</div>
							</div>
						</a>
					))}
			</div>
		</>
	);
};

export default FreqPlayerList;
