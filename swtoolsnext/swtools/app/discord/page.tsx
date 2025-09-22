"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DiscordRedirectPage() {

	useEffect(() => {
	    window.location.href = "https://discord.gg/jQwMmDvgZS";
	}, []);

	return (
		<main className="p-10 flex flex-col items-center justify-center text-4xl font-semibold">
			<p>Redirecting to Discord...</p>
            <br></br>
            <a className="text-sm" href="https://discord.gg/jQwMmDvgZS">Didn&apos;t work? Click here.</a>
		</main>
	);
}
