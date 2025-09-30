// Suggestion for a new hook
import React from "react";
import { useProfile } from "@/app/hooks/useProfile";
import { User } from "firebase/auth";

export function useUserTyped(user: User | null) {
	type UserInfoResponse = {
		user: UserProfile;
	};

	const [profileToken, setProfileToken] = React.useState<string | null>(null);
	const [typedUserInfo, setTypedUserInfo] = React.useState<UserInfoResponse | null>(null);

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

	return { typedUserInfo, profileToken, profileLoading };
}
