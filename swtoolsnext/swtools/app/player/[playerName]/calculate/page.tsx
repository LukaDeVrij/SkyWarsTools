import React from "react";

export default async function CalculatePage({ params }: { params: Promise<{ playerName: string }> }) {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;
	return (
		<div className="bg-content w-full flex flex-col justify-center align-center p-4 rounded-b-xl">
			<h1 className="text-4xl font-bold text-center mb-2">Calculate Progress</h1>
			<span className="font-semibold text-center mb-5">Utilize snapshots to plot your progress of a certain stat!</span>
		</div>
	);
}
