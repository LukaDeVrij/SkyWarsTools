type QueryStats = {
	weekKey: string;
	stats: StatEntry[];
};
type StatEntry = {
	value: string;
	score: number;
};

async function getStats(): Promise<QueryStats> {
	const res = await fetch("https://skywarstools.com/api/queryStats", { cache: "no-store" });
	if (!res.ok) return { weekKey: "", stats: [] };
	return res.json();
}

export default async function Home() {
	const response: QueryStats = await getStats();

	return (
		<div>
			<h1>Stats</h1>
			{response.stats.length === 0 ? (
				<p>No stats found.</p>
			) : (
				<ul>
					{response.stats.slice(0,10).map((entry, idx) => (
						<li key={entry.value + idx}>
							{entry.value}: {entry.score}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
