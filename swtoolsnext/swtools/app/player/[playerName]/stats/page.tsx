import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ playerName: string }> }) {
	const awaitedParams = await params;
	redirect(`/player/${awaitedParams.playerName}/stats/table`);
}
