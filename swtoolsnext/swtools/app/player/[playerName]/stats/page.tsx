"use client";
import { redirect, useParams } from "next/navigation";
import React from "react";

export default function Page() {
	const params = useParams();
	const playerName = params.playerName;

	return (
		<>
			<div className="flex justify-center font-semibold py-4 text-center">
				How did you get here?<br></br>Click a tab!
			</div>
		</>
	);
}
