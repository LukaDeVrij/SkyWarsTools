"use client";

import { auth } from "@/app/firebase/config";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LogsPanel from "./components/Logs";
import LogsDownloader from "./components/LogsDownloader";



const AdminPage: React.FC = () => {
	const [user, , ] = useAuthState(auth);
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
