import React from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";

type PatreonSupporter = {
	mc_account?: string;
	emoji?: string;
	name?: string;
};

type PatreonResponse = {
	success: boolean;
	supporters: PatreonSupporter[];
	cache?: boolean;
};

const PatreonPlayerList = () => {
	const { data, error, isLoading } = useSWR<PatreonResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/patreonSupporters`,
		fetcher
	);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{isLoading && <LoaderCircle className="animate-spin" />}
				{error && <div>Could not get Patreon supporters ):</div>}
				{!isLoading &&
					!error &&
					data &&
					data.supporters.map((supporter, index) => (
						<a
							href={`/player/${supporter.name}/stats`}
							key={index}
							className="flex items-center gap-3 lg:gap-4 bg-content rounded-md p-1 lg:p-2 w-full text-xl animate-press cursor-pointer enchanted"
						>
							{supporter.mc_account ? (
								<Image
									src={`https://www.mc-heads.net/avatar/${supporter.mc_account}`}
									alt={supporter.mc_account}
									width={40}
									height={40}
									className="rounded"
								/>
							) : (
								<div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded">
									<span className="text-xl">?</span>
								</div>
							)}
							<div className="min-w-0">
								<div className="font-semibold truncate max-w-[225px]">
									{supporter.name ?? "Unknown"} {supporter.emoji && <span className="mr-1">{supporter.emoji}</span>}
								</div>
							</div>
						</a>
					))}
			</div>
		</>
	);
};

export default PatreonPlayerList;
