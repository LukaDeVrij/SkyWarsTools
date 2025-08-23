"use client";

import { useEffect, useState } from "react";

type User = {
	auth_time: number;
	user_id: string;
	sub: string;
	iat: number;
	exp: number;
	email: string;
	email_verified: boolean;
	firebase: {
		identities: {
			email: string[];
		};
		sign_in_provider: string;
	};
	uid: string;
};

export default function ProfilePage() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				let res = await fetch("http://localhost:3000/auth/current-user", {
					method: "GET",
					credentials: "include",
				});

				// unauthorized → try refresh
				if (res.status === 401 || res.status === 403) {
					const refreshRes = await fetch("http://localhost:3000/auth/refresh-token", {
						method: "POST",
						credentials: "include",
					});

					if (!refreshRes.ok) throw new Error("Could not refresh session");

					// retry current-user
					res = await fetch("http://localhost:3000/auth/current-user", {
						method: "GET",
						credentials: "include",
					});
				}

				if (!res.ok) {
					throw new Error("Unable to fetch user");
				}

				const data = await res.json();
				console.log(data.user);
				setUser(data.user);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchCurrentUser();
	}, []);

	if (loading) {
		return <p className="text-center mt-10">Loading...</p>;
	}

	if (error) {
		return (
			<div className="text-center mt-10">
				<p className="text-red-500">{error}</p>
				<a href="/login" className="text-blue-600 underline hover:text-blue-800">
					Go to login
				</a>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<div className="bg-gray-600 p-8 rounded-2xl shadow-md w-96">
				<h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
				{user ? (
					<div className="space-y-2">
						<p>
							<span className="font-semibold">UID:</span> {user.uid}
						</p>
						<p>
							<span className="font-semibold">Email:</span> {user.email}
						</p>
					</div>
				) : (
					<p>No user data</p>
				)}
			</div>
		</div>
	);
}
