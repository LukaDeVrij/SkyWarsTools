"use client";
import MontageCard from "@/app/components/tools/PlayerMontageCard";
import ErrorView from "@/app/components/universal/ErrorView";
import { OverallResponse } from "@/app/types/OverallResponse";
import { fetcher, fillMCColorText } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const MontageCardPage = () => {
	const searchParams = useSearchParams();
	const playerName = searchParams.get("player") as string;

	const { data, isLoading } = useSWR<OverallResponse>(
		playerName ? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/skywars?player=${playerName}` : null,
		fetcher
	);

	if (!playerName) return <ErrorView statusCode={400} statusText="No player specified"></ErrorView>;

	if (isLoading) return <LoaderCircle className="mx-auto w-20 h-20 animate-spin"></LoaderCircle>;
	if (!data || !data.stats) return <ErrorView statusCode={400} statusText="No data received from API"></ErrorView>;

	return <MontageCard {...data}></MontageCard>;
};

export default MontageCardPage;
