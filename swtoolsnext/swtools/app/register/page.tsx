"use client";

import { useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	const handleRegister = async () => {
		try {
			const res = await createUserWithEmailAndPassword(email, password);

			if (res?.user) {
				router.push("/auth/profile");
			}
			setEmail("");
			setPassword("");
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
		<div className="flex h-200 items-center justify-center bg-main w-full lg:w-[1000px] rounded-xl">
			<div className="bg-content p-10 lg:rounded-lg shadow-xl w-full lg:w-120">
				<h1 className="text-white text-2xl mb-5 font-semibold">Register</h1>
				<p className="text-red-400 mb-2">{error?.message}</p>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full lg:w-100  p-3 mb-4 bg-main rounded outline-none text-white placeholder-gray-500"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full lg:w-100 p-3 mb-4 bg-main rounded outline-none  text-white placeholder-gray-500"
				/>
				<button
					onClick={handleRegister}
					className="w-full lg:w-100  p-3 bg-accent rounded font-semibold text-white bg-button mb-3 cursor-pointer animate-press"
				>
					Register
				</button>
				<button
					onClick={handleGoogleLogin}
					className="w-full lg:w-100  p-3 bg-gray-500 rounded text-white font-semibold hover:bg-gray-600 flex items-center justify-center gap-4 cursor-pointer animate-press"
				>
					<img src="/icons/google.png" alt="Google Logo" className="w-5 h-5" />
					Sign in with Google
				</button>
			</div>
		</div>
	);
}
