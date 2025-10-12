// "use client";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/app/firebase/config";
// import React from "react";
// import PropertyStatic from "@/app/components/settings/PropertyStatic";
// import { LoaderCircle } from "lucide-react";
// import { useProfile } from "@/app/hooks/useProfile";
// import PropertyInput from "@/app/components/settings/PropertyInput";
// import Button from "@/app/components/universal/Button";

// export default function PatreonPage() {
// 	const [user, loading, error] = useAuthState(auth);
// 	type UserInfoResponse = {
// 		user: UserProfile;
// 	};

// 	const [profileToken, setProfileToken] = React.useState<string | null>(null);
// 	const [, setTypedUserInfo] = React.useState<UserInfoResponse | null>(null);
// 	const [patreonStatus, setPatreonStatus] = React.useState<boolean>(false);
// 	const [contribStatus, setContribStatus] = React.useState<boolean>(false);
// 	const [, setEmoji] = React.useState<string | null>(null);

// 	React.useEffect(() => {
// 		if (user) {
// 			user.getIdToken().then(setProfileToken);
// 		} else {
// 			setProfileToken(null);
// 		}
// 	}, [user]);

// 	const { user: profileUser } = useProfile(profileToken);
// 	console.log(profileUser);
// 	React.useEffect(() => {
// 		if (profileUser) {
// 			setTypedUserInfo({ user: profileUser });
// 			setPatreonStatus(profileUser.patreon ?? false);
// 			setContribStatus(profileUser.contrib ?? false);
// 			setEmoji(profileUser.emoji ?? null);
// 		} else {
// 			setTypedUserInfo(null);
// 		}
// 	}, [profileUser]);

// 	function saveChanges() {
// 		if (!profileUser) return;
// 	}

// 	return (
// 		<>
// 			{loading && (
// 				<div className="w-full h-80 flex justify-center text-center items-center text-3xl">
// 					<LoaderCircle className="animate-spin"></LoaderCircle>
// 				</div>
// 			)}
// 			{error && <div>Error: {error.message}</div>}
// 			{!loading && !error && !user && <div>You are not logged in.</div>}
// 			{!loading && !error && patreonStatus == false && user && contribStatus == false && (
// 				<div className="p-4 font-semibold">
// 					You are not a Patreon supporter. Become one{" "}
// 					<a className="underline" href="/patreon">
// 						here
// 					</a>
// 					.
// 				</div>
// 			)}
// 			{!loading && !error && user && (
// 				<>
// 					<div className="p-5 w-full flex flex-col gap-2">
// 						<PropertyStatic
// 							title="Patreon Status"
// 							explainText={"Whether this account has Patreon benefits"}
// 							value={profileUser?.patreon == true ? "Yes" : "No"}
// 						/>
// 						<PropertyInput
// 							title="Emoji"
// 							explainText={"Emoji to show on start page"}
// 							value={profileUser?.emoji ?? ""}
// 							onChange={(value) => setEmoji(value)}
// 						/>
// 					</div>
// 					<div className="w-full flex justify-center mb-2">
// 						<Button onClick={saveChanges}>Save</Button>
// 					</div>
// 				</>
// 			)}
// 		</>
// 	);
// }
