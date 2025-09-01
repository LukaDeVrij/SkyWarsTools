"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useProfile } from "@/app/hooks/useProfile";
import PropertyLinking from "@/app/components/auth/PropertyLinking";
import PropertyCombobox from "@/app/components/settings/PropertyCombobox";
import { LoaderCircle } from "lucide-react";

const ProfileSettingsPage = () => {
	const [user, loading, error] = useAuthState(auth);

	type UserInfoResponse = {
		user: UserProfile;
	};

	const [typedUserInfo, setTypedUserInfo] = React.useState<UserInfoResponse | null>(null);
	const [profileToken, setProfileToken] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (user) {
			user.getIdToken().then(setProfileToken);
		} else {
			setProfileToken(null);
		}
	}, [user]);

	const { user: profileUser, isLoading: profileLoading } = useProfile(profileToken);

	React.useEffect(() => {
		if (profileUser) {
			setTypedUserInfo({ user: profileUser });
		} else {
			setTypedUserInfo(null);
		}
	}, [profileUser]);

	console.log(profileUser);


	return (
		<>
			{loading && (
				<div className="w-full h-80 flex justify-center text-center items-center text-3xl ">
					<LoaderCircle className="animate-spin"></LoaderCircle>
				</div>
			)}
			{error && <div>Error: {error.message}</div>}
			{!loading && !error && !user && <div>You are not logged in.</div>}
			{!loading &&
				!error &&
				user &&
				(typedUserInfo && typedUserInfo.user ? (
					<>
						<div className="p-5 w-full flex flex-col gap-2">
							<PropertyLinking
								linked={!!typedUserInfo.user.mc_account}
								uuid={typedUserInfo.user.mc_account ?? undefined}
							></PropertyLinking>
							{/* <PropertyCombobox
								title={"Profile Background"}
								explainText="The image shown on your MC account page"
								options={maps}
								initialValue="Siege.png"
							></PropertyCombobox> */}
						</div>
					</>
				) : (
					<p>Something went wrong.</p>
				))}
		</>
	);
};

export default ProfileSettingsPage;
