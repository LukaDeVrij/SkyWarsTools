"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const MapRotationCard: React.FC = () => {
	return (
		<div className="p-6">
			<Link href={"/tools/rotation"}>
				<h2 className="text-2xl font-bold mb-4 text-center">Maps</h2>
				<p className="mb-4 text-center">All Solo/Teams maps, and rotation history!</p>

				<div className="flex justify-center">
					<Image src="/rotation.png" alt="Counts preview" width={300} height={300} className="py-2 rounded-xl" />
				</div>
			</Link>
		</div>
	);
};

export default MapRotationCard;
