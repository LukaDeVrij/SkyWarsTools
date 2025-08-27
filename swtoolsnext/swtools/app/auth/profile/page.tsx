"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import React from "react";

export default function ProfilePage() {
	const [user, loading, error] = useAuthState(auth);
	const [signOut, signOutLoading, signOutError] = useSignOut(auth);
	const [userInfo, setUserInfo] = React.useState<any>(null);
	const [userInfoLoading, setUserInfoLoading] = React.useState(false);
	const [userInfoError, setUserInfoError] = React.useState<Error | null>(null);

	React.useEffect(() => {
		if (user && user.uid) {
			setUserInfoLoading(true);
			user.getIdToken()
				.then((token: string) => {
					fetch(`http://localhost:3001/auth/getUserInfo`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
						.then((res) => {
							if (!res.ok) throw new Error("Failed to fetch user info");
							return res.json();
						})
						.then((data) => setUserInfo(data))
						.catch((err) => setUserInfoError(err))
						.finally(() => setUserInfoLoading(false));
				})
				.catch((err) => {
					setUserInfoError(err);
					setUserInfoLoading(false);
				});
		} else {
			setUserInfo(null);
			setUserInfoError(null);
		}
	}, [user]);

	return (
		<div className="flex h-200 items-center justify-center bg-main w-full lg:w-[1000px] rounded-xl">
			<div className="bg-content p-10 lg:rounded-lg shadow-xl w-full lg:w-120">
				{loading && <div>Loading...</div>}
				{error && <div>Error: {error.message}</div>}
				{!loading && !error && !user && <div>You are not logged in.</div>}
				{!loading && !error && user && (
					<>
						<h1 className="text-white text-2xl mb-5 font-semibold">Profile</h1>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>UID:</strong> {user.uid}
						</p>
						<p>
							<strong>Email verified:</strong> {user.emailVerified ? "Yes" : "No"}
						</p>
						{userInfo && userInfo.user ? (
							<div>
								<strong>Custom properties:</strong>
								<ul className="list-disc ml-6">
									{Object.entries(userInfo.user).map(([key, value]) => (
										<li key={key}>
											<strong>{key}:</strong> {String(value)}
										</li>
									))}
								</ul>
							</div>
						) : (
							<p>
								<strong>Custom properties: </strong>None
							</p>
						)}
						<button
							onClick={signOut}
							disabled={signOutLoading}
							className="mt-4 w-full p-3 bg-button rounded text-white animate-press cursor-pointer"
						>
							{signOutLoading ? "Logging out..." : "Logout"}
						</button>
						{signOutError && <div style={{ color: "red" }}>Error: {signOutError.message}</div>}
					</>
				)}
			</div>
		</div>
	);
}
