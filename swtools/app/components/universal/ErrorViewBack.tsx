"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, StepBack } from "lucide-react";
import Image from "next/image";

type MetaDataResponse = {
	success: boolean;
	apiSpeed?: number;
	hypixelAPIDelay?: number;
};

const ErrorViewBack = () => {
	const router = useRouter();
	const [backError, setBackError] = React.useState(false);
	const [apiStatus, setApiStatus] = React.useState<MetaDataResponse>();

	const backRouter = () => {
		router.back();
		setTimeout(() => {
			setBackError(true);
			if (typeof window !== "undefined") {
				window.close();
			}
		}, 1000);
	};

	React.useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_SKYWARSTOOLS_API + "/api/getMetadata" || "http://api.skywarstools.com/api/getMetadata", {
			method: "GET",
		})
			.then(async (res) => {
				if (res.ok) {
					const data: MetaDataResponse = await res.json();
					setApiStatus(data);
				} else {
					setApiStatus({ success: false });
				}
			})
			.catch(() => {
				setApiStatus({ success: false });
			});
	}, []);

	return (
		<>
			<div className="flex items-center text-white flex-row gap-4">
				<div className="flex items-center gap-2 flex-col ">
					<button className="underline cursor-pointer animate-press-hard" onClick={() => backRouter()}>
						<StepBack className="w-20 h-20 animate-press"></StepBack>
					</button>
					Go Back
				</div>
				<div className="flex items-center gap-2 flex-col ">
					<Link href="/" className="cursor-pointer animate-press-hard">
						<Home className="w-20 h-20 "></Home>
					</Link>
					Home
				</div>
				<div className="flex items-center gap-2 flex-col ">
					<Link href="/discord" target="_blank" className="cursor-pointer animate-press-hard">
						<Image className="w-20 h-20" src="/icons/discord.png" alt="Discord" width={80} height={80} />
					</Link>
					Report
				</div>
			</div>
			<div className="mt-4 flex flex-row gap-4">
				<div>
					API Status:{" "}
					{apiStatus === undefined ? (
						<span className="text-gray-400">Checking...</span>
					) : apiStatus.success ? (
						<span className="text-green-400">Online</span>
					) : (
						<span className="text-red-400">Offline</span>
					)}
				</div>
				{apiStatus?.hypixelAPIDelay !== undefined && (
					<div>
						Last Hypixel API RT:{" "}
						<span
							className={
								apiStatus.hypixelAPIDelay > 2000
									? "text-red-400"
									: apiStatus.hypixelAPIDelay > 1000
									? "text-yellow-400"
									: "text-green-400"
							}
						>
							{apiStatus.hypixelAPIDelay} ms
						</span>
					</div>
				)}
				{apiStatus?.apiSpeed !== undefined && (
					<div>
						Last API RT:{" "}
						<span
							className={
								apiStatus.apiSpeed > 2000
									? "text-red-400"
									: apiStatus.apiSpeed > 1000
									? "text-yellow-400"
									: "text-green-400"
							}
						>
							{apiStatus.apiSpeed} ms
						</span>
					</div>
				)}
			</div>
			{backError && <div className="text-red-500 mt-4">This is a new tab, so we cannot go back.</div>}
		</>
	);
};

export default ErrorViewBack;
