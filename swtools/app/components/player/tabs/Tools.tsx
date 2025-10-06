import React from "react";
import { OverallResponse } from "@/app/types/OverallResponse";
import MontageCardCard from "../../tools/MontageCardCard";
import Link from "next/link";
import RecentGames from "./tools/RecentGames";
import RecentNames from "./tools/RecentNames";


const Tools: React.FC<OverallResponse> = (response) => {
    return (
            <div className="w-full text-left bg-content font-bold font flex flex-col gap-4 p-4 lg:flex-row lg:text-lg lg:justify-center flex-wrap">
                <Link className="bg-layer rounded-xl animate-press w-full lg:w-100" href={"/tools/card?player=" + response.uuid}>
                    <MontageCardCard addInput={false}></MontageCardCard>
                </Link>
                <RecentGames uuid={response.uuid} />
                <RecentNames uuid={response.uuid} />
            </div>
    );
};

export default Tools;
