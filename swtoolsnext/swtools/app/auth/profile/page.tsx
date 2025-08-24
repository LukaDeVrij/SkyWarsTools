"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import React from "react";

export default function ProfilePage() {
	const [user, loading, error] = useAuthState(auth);
	const [signOut, signOutLoading, signOutError] = useSignOut(auth);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!user) return <div>You are not logged in.</div>;

	return (
		<div className="flex h-screen items-center justify-center bg-gray-900">
			<div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
				<h2>Profile</h2>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>UID:</strong> {user.uid}
				</p>
				<button onClick={signOut} disabled={signOutLoading} className="mt-4 w-full p-3 bg-red-600 rounded text-white hover:bg-red-500">
					{signOutLoading ? "Logging out..." : "Logout"}
				</button>
				{signOutError && <div style={{ color: "red" }}>Error: {signOutError.message}</div>}
			</div>
		</div>
	);
}
