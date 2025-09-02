"use client"; 
import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

interface PlayerBannerProps {
	playerName: string;
}

const PlayerBanner: React.FC<PlayerBannerProps> = ({ playerName }) => {
	const [user, authLoading, authError] = useAuthState(auth);
	type UserInfoResponse = {
		user: UserProfile;
	};
	const [typedUserInfo, setTypedUserInfo] = React.useState<UserInfoResponse | null>(null);

	const [bg, setBG] = React.useState<string | null>(null);

	React.useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserByMC?player=${playerName}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data: UserInfoResponse) => {
				setTypedUserInfo(data);
				setBG(data.user.profile_bg ?? null);
			})
			.catch(() => setTypedUserInfo(null));
	});

	return (
		// In the future, make request to backend to get the banner for that player
		<div className="relative w-full">
			<Image
				src={authLoading ? "/maps/loading.png" : bg ? `/maps/${bg}` : "/maps/Siege.png"}
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
