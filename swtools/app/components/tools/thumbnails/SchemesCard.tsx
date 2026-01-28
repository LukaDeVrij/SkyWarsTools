"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SchemesCard: React.FC = () => {
	return (
		<div className="p-6">
			<Link href={"/tools/schemes"}>
				<h2 className="text-2xl font-bold mb-4 text-center">Schemes</h2>
				<p className="mb-4 text-center">See all schemes, their requirements and a preview.</p>

				<div className="flex justify-center">
					<Image src="/tools_schemes.png" alt="Schemes" width={220} height={220} className="py-2 rounded-xl" />
				</div>
			</Link>
		</div>
	);
};

export default SchemesCard;
