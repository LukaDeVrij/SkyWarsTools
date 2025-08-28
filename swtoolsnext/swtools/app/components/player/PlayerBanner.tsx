"use client";
import React from "react";
import Image from "next/image";
import { fetcher } from "@/app/utils/Utils";
import useSWR from "swr";

interface PlayerBannerProps {
	playerName: string;
}
type ProfileBGResponse = {
	success: boolean;
	cause?: string;
	profile_bg?: string | null;
};

const PlayerBanner: React.FC<PlayerBannerProps> = ({ playerName }) => {
	const { data, error, isLoading } = useSWR<ProfileBGResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getProfileBG?player=${playerName}`,
		fetcher
	);
	return (
		// In the future, make request to backend to get the banner for that player
		<div className="relative w-full">
			<Image
				src={isLoading ? "/maps/loading.png" : data && data.profile_bg ? `/maps/${data.profile_bg}.png` : "/maps/Siege.png"}
				priority
				width={1920}
				height={1080}
				className="w-full h-30 lg:h-45 object-cover"
				alt="Player Banner"
			/>
			<Image
				alt="player avatar"
				width={100}
				height={100}
				className="rounded h-20 w-20 lg:h-28 lg:w-28 mb-6 lg:mb-12 shadow-3xl absolute left-2 bottom-[-16] hidden"
				src={`https://www.mc-heads.net/avatar/${playerName}`}
			/>
		</div>
	);
};

export default PlayerBanner;
