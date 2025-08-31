"use client";
import useSWR from "swr";
import { fetcher } from "./utils/Utils";
import { LoaderCircle } from "lucide-react";

type QueryStats = {
	weekKey: string;
	stats: StatEntry[];
};
type StatEntry = {
	value: string;
	score: number;
};

export default function Home() {
	const { data, error, isLoading } = useSWR<QueryStats>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/queryStats`, fetcher);
	return (
		<div className="flex h-200 items-center justify-center bg-main w-full lg:w-[1000px] rounded-xl">
			<div className="bg-content p-10 lg:rounded-lg shadow-xl w-full lg:w-120">
				{isLoading && <LoaderCircle className="animate-spin"></LoaderCircle>}
				{error && <div>Error: {error.message}</div>}
				{!isLoading && !error && data && (
					<table className="table-auto w-full text-left">
						<thead>
							<tr>
								<th className="px-4 py-2">Value</th>
								<th className="px-4 py-2">Score</th>
							</tr>
						</thead>
						<tbody>
							{data.stats.map((entry, index) => (
								<tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
									<td className="border px-4 py-2">{entry.value}</td>
									<td className="border px-4 py-2">{entry.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
