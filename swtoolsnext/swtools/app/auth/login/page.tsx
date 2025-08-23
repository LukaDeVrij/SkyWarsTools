"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include", // <--- important for cookies
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Login failed");

			alert("Login successful!");
			router.push("/auth/profile");
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

	const handleGoogleSignin = () => {};

	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gray-900">
			<div className="bg-gray-800 p-8 rounded-2xl shadow-md w-96">
				<form onSubmit={handleSubmit} className="">
					<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 mb-3 border rounded-md"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 mb-4 border rounded-md"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<div className="flex items-center justify-center">
					<button
						onClick={handleGoogleSignin}
						className="w-15 h-15 text-white p-2 rounded-md transition mt-4 cursor-pointer bg-gray-600 flex items-center justify-center hover:bg-gray-500 animate-press"
					>
						<img src="/icons/google.png" alt="Google" className="w-10 h-10" />
					</button>
				</div>
			</div>
		</div>
	);
}
