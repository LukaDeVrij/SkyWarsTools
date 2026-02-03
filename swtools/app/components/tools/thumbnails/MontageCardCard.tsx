"use client";
import React from "react";
import Image from "next/image";

interface MontageCardCardProps {
	addInput: boolean;
}

const MontageCardCard: React.FC<MontageCardCardProps> = ({ addInput }) => {
	const [player, setPlayer] = React.useState("");
	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4 text-center">Montage Card</h2>
			<p className="mb-4 text-center">Killed a known player? Want them in your montage? Of course!</p>
			{addInput && (
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
						className="p-2 flex-1 font-semibold rounded-l border border-gray-300 focus:outline-none "
						onChange={(e) => setPlayer(e.target.value)}
						value={player}
					/>
					<button type="submit" className="p-2 font-semibold px-4 bg-button rounded-r transition-colors" disabled={!player.trim()}>
						Go
					</button>
				</form>
			)}
			<div className="mt-4 space-y-2">
				<Image src="/LifelessNerd_card.png" alt="Example Montage Card" width={400} height={200} className="py-2 rounded" />
				<Image src="/FluffyFoxNoodle_card.png" alt="Example Montage Card" width={400} height={200} className="py-2 rounded" />
				<Image src="/Beazinga_card.png" alt="Example Montage Card" width={400} height={200} className="rounded py-2" />
			</div>
		</div>
	);
};

export default MontageCardCard;
