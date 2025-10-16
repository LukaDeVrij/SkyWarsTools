"use client";

import { auth } from "@/app/firebase/config";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LogsPanel from "./components/Logs";
import LogsDownloader from "./components/LogsDownloader";

// Fetch function for admin API
export async function fetchAdminData(token: string | null, urlSuffix: string) {
	if (!token) throw new Error("No auth token provided");

	const url = `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/admin/${urlSuffix}`;

	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	if (data.success !== true) {
		throw new Error(data.cause || "Unknown error");
	}
	return data;
}

const AdminPage: React.FC = () => {
	const [user, loading, error] = useAuthState(auth);
	const [profileToken, setProfileToken] = React.useState<string | null>(null);

	React.useEffect(() => {
		let isMounted = true;
		if (user) {
			user.getIdToken().then((token) => {
				if (isMounted) setProfileToken(token);
			});
		} else {
			setProfileToken(null);
		}
		return () => {
			isMounted = false;
		};
	}, [user]);

	return (
		<div className="w-full min-h-screen bg-content flex flex-col items-center justify-start p-8 gap-4">
			<LogsPanel profileToken={profileToken} />
			<LogsDownloader profileToken={profileToken} />
		</div>
	);
};

export default AdminPage;
