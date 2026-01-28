"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const CountsCard: React.FC = () => {
	return (
		<div className="p-6">
			<Link href={"/tools/counts"}>
				<h2 className="text-2xl font-bold mb-4 text-center">Player Counts</h2>
				<p className="mb-4 text-center">See various statistics about Hypixel SkyWars, such as player counts.</p>

				<div className="flex justify-center">
					<Image src="/counts_card.png" alt="Counts preview" width={220} height={220} className="py-2 rounded-xl" />
				</div>
			</Link>
		</div>
	);
};

export default CountsCard;
