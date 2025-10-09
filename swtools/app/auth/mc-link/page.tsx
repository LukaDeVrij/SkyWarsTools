"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useProfile } from "@/app/hooks/useProfile";
import PropertyLinking from "@/app/components/auth/PropertyLinking";
import Loading from "@/app/components/universal/Loading";

const ProfileSettingsPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [profileToken, setProfileToken] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (user) {
			user.getIdToken().then(setProfileToken);
		} else {
			setProfileToken(null);
		}
	}, [user]);

	const { user: profileUser, isLoading: profileLoading } = useProfile(profileToken);

	// Show loader while either auth or profile is loading
	if (loading || profileLoading) {
		return <Loading></Loading>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!user) {
		return <div>You are not logged in.</div>;
	}

	if (!profileUser) {
		return <p>Something went wrong.</p>;
	}

	return (
		<div className="p-5 w-full flex flex-col gap-2">
			<PropertyLinking linked={!!profileUser.mc_account} uuid={profileUser.mc_account ?? undefined} />
		</div>
	);
};

export default ProfileSettingsPage;
