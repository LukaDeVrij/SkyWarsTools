"use client";
import React from "react";

const MontageCardCard = () => {
	const [player, setPlayer] = React.useState("");
	return (
		<div className="p-6 max-w-md mx-auto">
			<h2 className="text-2xl font-bold mb-4">Montage Card</h2>
			<p className="mb-4">Killed a known player? Want them in your montage? Of course!</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const player = (e.currentTarget.elements.namedItem("player") as HTMLInputElement).value.trim();
					if (player) {
						window.location.href = `/tools/card?player=${encodeURIComponent(player)}`;
					}
				}}
				className="flex"
			>
				<input
					type="text"
					name="player"
					placeholder="Player name"
					className="p-2 flex-1 font-semibold rounded-l border border-gray-300 focus:outline-none"
					onChange={(e) => setPlayer(e.target.value)}
					value={player}
				/>
				<button type="submit" className="p-2 font-semibold px-4 bg-button rounded-r transition-colors" disabled={!player.trim()}>
					Go
				</button>
			</form>
			<img src="/LifelessNerd_card.png" alt="Example Montage Card" className="mt-4 rounded shadow-lg" />
			<img src="/FluffyFoxNoodle_card.png" alt="Example Montage Card" className="mt-4 rounded shadow-lg" />
			<img src="/Beazinga_card.png" alt="Example Montage Card" className="mt-4 rounded shadow-lg" />
		</div>
	);
};

export default MontageCardCard;
