"use client";
import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";

interface PlayerBannerProps {
	playerName: string;
}

const PlayerBanner: React.FC<PlayerBannerProps> = ({ playerName }) => {
	const [, authLoading] = useAuthState(auth);
	type UserInfoResponse = {
		user: UserProfile;
	};

	const { data: typedUserInfo } = useSWR<UserInfoResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserByMC?player=${playerName}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	let bg = "Winter Retreat.png";
	if (typedUserInfo?.user && typedUserInfo?.user.profile_bg) {
		bg = typedUserInfo?.user.profile_bg;
	}
	// console.log(bg);

	return (
		<div className="relative w-full">
			<Image
				src={
					authLoading
						? "/maps/loading.png"
						: `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/image?name=` + bg.replaceAll(".png", "")
				}
				priority
				width={1150}
				height={180}
				className="w-full h-30 lg:h-45 object-cover"
				alt="Player Banner"
				quality={100}
			/>
		</div>
	);
};

export default PlayerBanner;
