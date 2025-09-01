"use client";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

interface NavBarProfileProps {
	mobile?: boolean;
}

const NavBarProfile: React.FC<NavBarProfileProps> = ({ mobile = false }) => {
	const [user, loading, error] = useAuthState(auth);
	if (error) {
		console.error("Error fetching user:", error);
	}

	return (
		<Link
			className={`float-right ml-auto p-2 rounded-md text-[var(--foreground)] font-montserrat font-[700] animate-press ${
				mobile ? "block lg:hidden" : "hidden lg:block"
			}`}
			href={user ? "/profile" : "/login"}
		>
			{loading ? (
				<div className="h-12 w-12 rounded aspect-square" title={"Profile"} />
			) : user ? (
				<div
					className="h-12 w-12 rounded aspect-square bg-gray-600 flex items-center justify-center text-2xl uppercase "
					title={"Profile"}
				>
					<User></User>
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
