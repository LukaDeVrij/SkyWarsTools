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
	const [, authLoading, ] = useAuthState(auth);
	type UserInfoResponse = {
		user: UserProfile;
	};

	const { data: typedUserInfo, } = useSWR<UserInfoResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserByMC?player=${playerName}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	let bg = "Siege.png";
	if (typedUserInfo?.user && typedUserInfo?.user.profile_bg) {
		bg = typedUserInfo?.user.profile_bg;
	}
	// console.log(bg);

	return (
		
		<div className="relative w-full">
			<Image
				src={authLoading ? "/maps/loading.png" : "/maps/" + bg}
				priority
				width={1920}
				height={1080}
				className="w-full h-30 lg:h-45 object-cover"
				alt="Player Banner"
			/>
			{/* {typedUserInfo?.user?.bio && <Tooltip title={'Supporter bio, get your own by subscribing to Patreon!'}>
				<p className="text-gray-200 italic text-2xl  tracking-wide absolute bottom-1/2 left-1/2 transform -translate-x-1/2">"{typedUserInfo?.user?.bio}"</p>
			</Tooltip>} */}
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
