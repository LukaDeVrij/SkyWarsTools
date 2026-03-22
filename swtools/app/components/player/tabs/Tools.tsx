import React from "react";
import { OverallResponse } from "@/app/types/OverallResponse";
import MontageCardCard from "../../tools/thumbnails/MontageCardCard";
import Link from "next/link";
import RecentGames from "./tools/RecentGames";
import RecentNames from "./tools/RecentNames";
import ClimberCard from "../../tools/thumbnails/ClimberCard";


const Tools: React.FC<OverallResponse> = (response) => {
    return (
            <div className="w-full text-left rounded-xl bg-content font-bold font flex flex-col gap-4 p-4 lg:flex-row lg:text-lg lg:justify-center flex-wrap">
                <Link className="bg-layer rounded-xl animate-press w-full lg:w-90 aspect-square flex" href={"/tools/card?player=" + response.uuid}>
                    <MontageCardCard addInput={false}></MontageCardCard>
                </Link>
                <RecentGames uuid={response.uuid} />
                <RecentNames uuid={response.uuid} />
                <Link className="bg-layer rounded-xl animate-press w-full lg:w-90 aspect-square flex" href={"/tools/climber?player=" + response.uuid}>
                    <ClimberCard addInput={false}></ClimberCard>
                </Link>
            </div>
    );
};

export default Tools;
