"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

const ErrorViewBack = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-4 items-center text-white ">
			<div>
				<button className="underline cursor-pointer animate-press" onClick={() => router.back()}>
					Go back to where you came from?
				</button>
			</div>
			<Link href="/" className="cursor-pointer">
				<Home className="w-20 h-20 animate-press"></Home>
			</Link>
		</div>
	);
};

export default ErrorViewBack;
