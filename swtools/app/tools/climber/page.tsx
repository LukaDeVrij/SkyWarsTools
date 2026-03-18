"use client";

import LeaderboardClimber from "@/app/components/player/tabs/tools/LeaderboardClimber";
import ErrorView from "@/app/components/universal/ErrorView";
import Loading from "@/app/components/universal/Loading";
import { OverallResponse } from "@/app/types/OverallResponse";
import { fetcher } from "@/app/utils/Utils";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import useSWR from "swr";

const ClimberPage = () => {
  const searchParams = useSearchParams();
  const playerName = searchParams.get("player") as string;

  const { data, isLoading, error } = useSWR<OverallResponse>(
    `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/skywars?player=${playerName}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return (
    <div className="w-full">
      {isLoading ? <Loading /> : null}
      {!isLoading && !data ? <ErrorView statusText="No data found" /> : null}
      {data && !data.player ? <ErrorView statusText={error?.message || "No such player!"} /> : null}
      {data && !data.stats.skywars_experience ? (
        <ErrorView statusText="This player has never played SkyWars!" />
      ) : null}
      {data && data.player && data.stats.skywars_experience ? (
        <LeaderboardClimber response={{ ...data, took: data.took ?? 0 }} />
      ) : null}
    </div>
  );
};

export default ClimberPage;