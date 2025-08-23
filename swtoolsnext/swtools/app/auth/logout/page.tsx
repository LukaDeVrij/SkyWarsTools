"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
	const router = useRouter();
	const [message, setMessage] = useState("Logging out...");

	useEffect(() => {
		const logout = async () => {
			try {
				const res = await fetch("http://localhost:3001/auth/logout", {
					method: "POST",
					credentials: "include",
				});

				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					throw new Error(data.error || "Logout failed");
				}

				setMessage("Logged out successfully. Redirecting...");
				setTimeout(() => router.push("/auth/login"), 1000);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setMessage(err.message);
				} else {
					setMessage("An unknown error occurred");
				}
			}
		};

		logout();
	}, [router]);

	return (
		<div className="flex h-screen items-center justify-center bg-gray-900">
			<div className="bg-gray-600 p-6 rounded-2xl shadow-md">
				<p className="text-center">{message}</p>
			</div>
		</div>
	);
}
