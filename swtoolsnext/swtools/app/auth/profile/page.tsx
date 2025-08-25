"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import React from "react";

export default function ProfilePage() {
	const [user, loading, error] = useAuthState(auth);
	const [signOut, signOutLoading, signOutError] = useSignOut(auth);

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
