"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import React from "react";
import PropertyStatic from "@/app/components/settings/PropertyStatic";
import { LoaderCircle } from "lucide-react";

export default function ProfilePage() {
	const [user, loading, error] = useAuthState(auth);

	return (
		<>
			{loading && <div className="w-full h-80 flex justify-center text-center items-center text-3xl"><LoaderCircle className="animate-spin"></LoaderCircle></div>}
			{error && <div>Error: {error.message}</div>}
			{!loading && !error && !user && <div>You are not logged in.</div>}
			{!loading && !error && user && (
				<>
					<div className="p-5 w-full flex flex-col gap-2">
						<PropertyStatic
							title="Email address"
							explainText={"The email address connected to the account"}
							value={user.email}
							hideValue={true}
						/>
						<PropertyStatic
							title="Email verified"
							explainText={"Whether the email is verified"}
							value={user.emailVerified == true ? "Yes" : "No"}
						/>
						<PropertyStatic
							title="UID"
							explainText={"Profile unique ID, useful for development"}
							value={user.uid}
							hideValue={true}
						/>
					</div>
				</>
			)}
		</>
	);
}
