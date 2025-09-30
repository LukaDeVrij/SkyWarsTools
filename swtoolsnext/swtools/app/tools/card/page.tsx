"use client";
import MontageCard from "@/app/components/tools/PlayerMontageCard";
import ErrorView from "@/app/components/universal/ErrorView";
import Loading from "@/app/components/universal/Loading";
import { OverallResponse } from "@/app/types/OverallResponse";
import { fetcher } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import useSWR from "swr";

const MontageCardPage = () => {
	return (
		<Suspense>
			<SuspenseMontageCardPage />
		</Suspense>
	);
};
const SuspenseMontageCardPage = () => {
	const searchParams = useSearchParams();
	const playerName = searchParams.get("player") as string;

	const { data, isLoading, error } = useSWR<OverallResponse>(
		playerName ? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/skywars?player=${playerName}` : null,
		fetcher
	);
	if (isLoading)
		return (
			<Loading></Loading>
		);
	if (!data) return <ErrorView statusText="No data found" />;
	if (!data.player) return <ErrorView statusText={error?.message || "No such player!"} />;
	if (!data.stats.skywars_experience) return <ErrorView statusText="This player has never played SkyWars!" />;

	return data ? <MontageCard {...{ ...data, took: data.took ?? 0 }} /> : null;
};
export default MontageCardPage;
