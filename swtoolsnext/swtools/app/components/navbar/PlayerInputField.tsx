"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const PlayerInputField = () => {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
		if (e) e.preventDefault();
		if (!input.trim()) return;
		setLoading(true);
		setError("");
		const playerName = input.trim();
		setInput("");
		try {
			const res = await fetch(`https://skywarstools.com/api/getUUID?player=${encodeURIComponent(playerName)}`);
			const data = await res.json();
			console.log("API response:", data);
			if (res.ok && data.name) {
				console.log("Player found, redirecting...");

				router.push(`/player/${encodeURIComponent(input.trim())}/stats/table`);
			} else {
				console.warn("Player not found:", data);
				setError("Player not found.");
			}
		} catch {
			setError("Error checking player.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex align-middle gap-1 lg:text-xl w-[180px] lg:w-[245px] m-1 bg-[var(--background)] p-2 rounded-xl"
			>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSubmit(e);
					}}
					placeholder="Search a player..."
					disabled={loading}
					className="flex w-[140px] lg:w-[200px] outline-0" // Im gonna be honest, magic numbered this - looks good on mobile and desktop
				/>
				<button
					type="submit"
					disabled={loading || !input.trim()}
					className="flex items-center justify-center cursor-pointer"
				>
					{loading ? (
						<svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
								fill="none"
							/>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
						</svg>
					) : error ? (
						<div title={error}>
							<svg
								className="h-6 w-6 text-red-500"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" />
								<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" />
							</svg>
						</div>
					) : (
						<Search className="h-[20px] w-[20px] animate-press-hard" />
					)}
				</button>
			</form>
		</>
	);
};

export default PlayerInputField;
