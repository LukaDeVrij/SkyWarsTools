"use client";
import { useEffect } from "react";

export default function PatreonRedirectPage() {
	useEffect(() => {
		window.location.href = "https://www.patreon.com/cw/LukaLifelessNerd";
	}, []);

	return (
		<main className="p-10 flex flex-col items-center justify-center text-4xl font-semibold">
			<p>Redirecting to Patreon...</p>
			<br></br>
			<a className="text-sm" href="https://www.patreon.com/cw/LukaLifelessNerd">
				Didn&apos;t work? Click here.
			</a>
		</main>
	);
}
