"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const res = await signInWithEmailAndPassword(email, password);
			console.log({ res });
			setEmail("");
			setPassword("");
			return router.push("/auth/profile");
		} catch (e) {
			console.error(e);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const res = await signInWithGoogle();
			console.log({ res });
			return router.push("/auth/profile");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="flex h-screen items-center justify-center bg-gray-900">
			<div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
				<h1 className="text-white text-2xl mb-5">Sign In</h1>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
				/>
				<button onClick={handleLogin} className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 mb-3">
					Sign In
				</button>
				<button
					onClick={handleGoogleLogin}
					className="w-full p-3 bg-gray-500 rounded text-white hover:bg-gray-600 flex items-center justify-center gap-4"
				>
					<img src="/icons/google.png" alt="Google Logo" className="w-5 h-5" />
					Sign in with Google
				</button>
			</div>
		</div>
	);
}
