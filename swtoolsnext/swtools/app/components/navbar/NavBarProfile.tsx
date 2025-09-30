"use client";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useRef, useEffect } from "react";

interface NavBarProfileProps {
	mobile?: boolean;
}

const NavBarProfile: React.FC<NavBarProfileProps> = ({ mobile = false }) => {
	const [user, loading, error] = useAuthState(auth);
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	if (error) {
		console.error("Error fetching user:", error);
	}

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<div className={`relative float-right ml-auto ${mobile ? "block lg:hidden" : "hidden lg:block"}`} ref={dropdownRef}>
			<button
				type="button"
				className="p-2 rounded-md text-[var(--foreground)] font-montserrat font-[700] animate-press focus:outline-none"
				onClick={() => setOpen((prev) => !prev)}
				aria-haspopup="true"
				aria-expanded={open}
			>
				{loading ? (
					<div className="h-12 w-12 rounded aspect-square" title={"Profile"} />
				) : user ? (
					<div
						className="h-12 w-12 rounded aspect-square bg-gray-600 flex items-center justify-center text-2xl uppercase"
						title={"Profile"}
					>
						<User />
					</div>
				) : (
					<div title={"Login"}>
						<LogIn />
					</div>
				)}
			</button>
			{open && (
				<div className="absolute right-0 w-48 bg-content rounded shadow-lg z-50">
					{user ? (
						<Link href="/auth/profile" className="block px-4 py-2 text-white" onClick={() => setOpen(false)}>
							Profile
						</Link>
					) : (
						<Link href="/login" className="block px-4 py-2 text-white" onClick={() => setOpen(false)}>
							Login
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default NavBarProfile;
