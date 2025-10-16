"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import React from "react";
import PropertyStatic from "@/app/components/settings/PropertyStatic";
import Loading from "@/app/components/universal/Loading";
import ErrorView from "@/app/components/universal/ErrorView";

export default function ProfilePage() {
	const [user, loading, error] = useAuthState(auth);

	const [token, setToken] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (user) {
			user.getIdToken().then((t) => setToken(t));
		}
	}, [user]);

	return (
		<>
			{loading && <Loading />}
			{!loading && error && <ErrorView statusText={error.cause as string} />}
			{!loading && !error && !user && <ErrorView statusText="You must be logged in to view this page" statusCode={401} />}
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
						{/* <PropertyStatic
							title="Auth Token"
							explainText={"DO NOT SHARE! Useful for development"}
							value={token}
							hideValue={true}
						/> */}
					</div>
				</>
			)}
		</>
	);
}
