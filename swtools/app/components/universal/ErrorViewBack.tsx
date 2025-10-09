"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, StepBack } from "lucide-react";
import Image from "next/image";


const ErrorViewBack = () => {
	const router = useRouter();
	const [backError, setBackError] = React.useState(false);
	const [apiStatus, setApiStatus] = React.useState<"ok" | "down" | "checking">("checking");

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
		setApiStatus("checking");
		fetch(process.env.NEXT_PUBLIC_SKYWARSTOOLS_API || "http://api.skywarstools.com", { method: "GET" })
			.then((res) => {
				if (res.ok) {
					setApiStatus("ok");
				} else {
					setApiStatus("down");
				}
			})
			.catch(() => {
				setApiStatus("down");
			});
	}, []);

	return (
		<>
			<div className="flex items-center text-white flex-row gap-4">
				<div className="flex items-center gap-2 flex-col">
					<button className="underline cursor-pointer animate-press" onClick={() => backRouter()}>
						<StepBack className="w-20 h-20 animate-press"></StepBack>
					</button>
					Go Back
				</div>
				<div className="flex items-center gap-2 flex-col">
					<Link href="/" className="cursor-pointer">
						<Home className="w-20 h-20 animate-press"></Home>
					</Link>
					Home
				</div>
				<div className="flex items-center gap-2 flex-col">
					<Link href="/discord" target="_blank" className="cursor-pointer">
						<Image className="w-20 h-20" src="/icons/discord.png" alt="Discord" width={80} height={80} />
					</Link>
					Report
				</div>
			</div>
			<div className="mt-4">
				API Status:{" "}
				{apiStatus === "checking" ? (
					"Checking..."
				) : apiStatus === "ok" ? (
					<span className="text-green-400">Online</span>
				) : (
					<span className="text-red-400">Offline</span>
				)}
			</div>
			{backError && <div className="text-red-500 mt-4">This is a new tab, so we cannot go back.</div>}
		</>
	);
};

export default ErrorViewBack;
