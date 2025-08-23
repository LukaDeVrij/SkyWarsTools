"use client";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface NavBarProfileProps {
	mobile?: boolean;
}

const NavBarProfile: React.FC<NavBarProfileProps> = ({ mobile = false }) => {
	const [username, setUsername] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch("http://localhost:3000/auth/current-user", { credentials: "include" });
				if (res.ok) {
					const data = await res.json();
					console.log(data);
					setUsername(data.user.email || null);
				} else {
					setUsername(null);
				}
			} catch (e) {
				setUsername(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	return (
		<Link
			className={`float-right ml-auto p-2 rounded-md text-[var(--foreground)] font-montserrat font-[700] animate-press ${
				mobile ? "block lg:hidden" : "hidden lg:block"
			}`}
			href={username ? "/auth/profile" : "/auth/login"}
		>
			{loading ? (
				<div className="h-12 w-12 rounded aspect-square" title={"Profile"} />
			) : username ? (
				<div
					className="h-12 w-12 rounded aspect-square bg-gray-600 flex items-center justify-center text-2xl uppercase "
					title={"Profile"}
				>
					{username.charAt(0)}
				</div>
			) : (
				<div title={"Login"}>
					<LogIn />
				</div>
			)}
		</Link>
	);
};

export default NavBarProfile;
