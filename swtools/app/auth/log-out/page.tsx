"use client";
import React from "react";
import { auth } from "@/app/firebase/config";

const LogoutPage = () => {
	return (
		<button
			onClick={async () => {
				try {
					await auth.signOut();
					alert("You have been logged out.");
					window.location.href = "/";
				} catch (error) {
					console.error("Error signing out:", error);
				}
			}}
			className="px-4 py-2 font-semibold m-4 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
		>
			Log Out
		</button>
	);
};

export default LogoutPage;
