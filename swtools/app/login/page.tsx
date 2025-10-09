"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LogoutPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const router = useRouter();

	const handleLogin = async () => {
		const res = await signInWithEmailAndPassword(email, password);

		if (res?.user) {
			return router.push("/auth/profile");
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
			<div className="bg-content p-10 lg:rounded-lg shadow-xl w-120">
				<h1 className="text-white text-2xl mb-5 font-semibold">Sign In</h1>
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
					onClick={handleLogin}
					className="w-full lg:w-100  p-3 bg-accent rounded font-semibold text-white bg-button mb-3 cursor-pointer animate-press"
				>
					Sign In
				</button>
				<button
					onClick={handleGoogleLogin}
					className="w-full lg:w-100  p-3 bg-gray-500 rounded text-white font-semibold hover:bg-gray-600 flex items-center justify-center gap-4 cursor-pointer animate-press"
				>
					<Image src="/icons/google.png" alt="Google Logo" className="w-7 h-7" height={100} width={100}/>
					Sign in with Google
				</button>
			</div>
		</div>
	);
}
