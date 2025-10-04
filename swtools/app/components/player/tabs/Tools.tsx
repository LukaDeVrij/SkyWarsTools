import React from "react";
import { toCamelCase } from "@/app/utils/Utils";
import KitPrestigeString from "../../universal/KitPrestigeString";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";
import MinecraftText from "@/app/utils/MinecraftText";
import MontageCardCard from "../../tools/MontageCardCard";
import Link from "next/link";
import useSWR from "swr";
import RecentGames from "./tools/RecentGames";


const Tools: React.FC<OverallResponse> = (response) => {
    return (
        <TabContent>
            <div className="w-full text-left bg-content font-bold font flex flex-col gap-4 lg:flex-row lg:text-lg lg:justify-center flex-wrap">
                <Link className="bg-layer rounded-xl animate-press" href={"/tools/card?player=" + response.uuid}>
                    <MontageCardCard addInput={false}></MontageCardCard>
                </Link>
                <RecentGames uuid={response.uuid} />
            </div>
        </TabContent>
    );
};

export default Tools;
