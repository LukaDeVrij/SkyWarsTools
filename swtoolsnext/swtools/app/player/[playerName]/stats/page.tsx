import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ playerName: string }> }) {
	const awaitedParams = await params;

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(awaitedParams.playerName)}`
	);
	const data = await res.json();

	if (!res.ok || !data.name) {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-2xl font-bold mb-4">Player not found</h1>
				<p className="text-lg">The player "{awaitedParams.playerName}" does not exist.</p>
			</div>
		);
	}

	redirect(`/player/${data.name}/stats/table`);
}
