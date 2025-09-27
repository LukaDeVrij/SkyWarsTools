"use client";
import MontageCard from "@/app/components/tools/PlayerMontageCard";
import ErrorView from "@/app/components/universal/ErrorView";
import { OverallResponse } from "@/app/types/OverallResponse";
import { fetcher } from "@/app/utils/Utils";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const MontageCardPage = () => {

	const searchParams = useSearchParams();
	const playerName = searchParams.get("player") as string;
	// TODO add fallbacks for this but next wont like it !

	const { data, isLoading } = useSWR<OverallResponse>(
		playerName ? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/skywars?player=${playerName}` : null,
		fetcher
	);
	return data ? <MontageCard {...{ ...data, took: data.took ?? 0 }} /> : null;
};

export default MontageCardPage;
