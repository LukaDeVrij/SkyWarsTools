"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import PropertyCombobox from "@/app/components/settings/PropertyCombobox";
import { LoaderCircle } from "lucide-react";
import Button from "@/app/components/universal/Button";
import { useProfile } from "@/app/hooks/useProfile";
import PropertyStatic from "@/app/components/settings/PropertyStatic";
import PropertyInput from "@/app/components/settings/PropertyInput";

const ProfileSettingsPage = () => {
	const [user, loading, error] = useAuthState(auth);
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
			setNationality(profileUser.nationality ?? null);
			setBackground(profileUser.profile_bg ?? null);
			setEmoji(profileUser.emoji ?? null);
		} else {
			setTypedUserInfo(null);
		}
	}, [profileUser]);

	const maps = [
		"Aegis.png",
		"Aelle.png",
		"Aku.png",
		"Ancient.png",
		"Aquacrown.png",
		"Aquarius.png",
		"Arkose.png",
		"Arule.png",
		"Atlas.png",
		"Atuin.png",
		"Bastion.png",
		"Blossom.png",
		"Bonsai.png",
		"Candylane.png",
		"Canopy.png",
		"Causeway.png",
		"Chateau.png",
		"Checkered Manor.png",
		"Chronos.png",
		"Citadel.png",
		"Clearing.png",
		"Congestion.png",
		"Cookie Fest.png",
		"Craboab.png",
		"Crumble.png",
		"Crystal Source.png",
		"Dawn.png",
		"Deadland.png",
		"Deserted Dunes.png",
		"Desserted Islands.png",
		"Dwarven.png",
		"Egg Isle.png",
		"Elven.png",
		"Embercell.png",
		"Entangled.png",
		"Farmstead.png",
		"Felkenheart.png",
		"Firelink Shrine.png",
		"Forest.png",
		"Forgotten.png",
		"Fossil.png",
		"Fragment.png",
		"Frostbound.png",
		"Frostgard.png",
		"Frosty.png",
		"Fruitcake.png",
		"Garage.png",
		"Garland.png",
		"Garrison.png",
		"Glacier.png",
		"Glazed.png",
		"Hanging Gardens.png",
		"Harmony.png",
		"Heaven Palace.png",
		"Helios.png",
		"Hibiscus.png",
		"Honeycomb.png",
		"Jagged.png",
		"Jinzhou.png",
		"Kingdom.png",
		"Kraken.png",
		"loading.png",
		"Long Island.png",
		"Manor.png",
		"Martian.png",
		"Memorial.png",
		"Metari Temple.png",
		"Mont Golball.png",
		"Mothership.png",
		"Mountain Top.png",
		"Mushroom Vale.png",
		"Mushy.png",
		"Mythic.png",
		"Mythos.png",
		"Neapolitan.png",
		"Nightmare.png",
		"Niu.png",
		"Nomad.png",
		"Oberon Towers.png",
		"Oceana.png",
		"Offering.png",
		"Onionring 2.png",
		"Onionring.png",
		"Overfall.png",
		"Palette.png",
		"Paradise.png",
		"Plateau.png",
		"Pralines.png",
		"Radis.png",
		"Railroad.png",
		"Railwork.png",
		"Redfang.png",
		"Roots.png",
		"Rustic.png",
		"Sacrifice.png",
		"Sanctuary.png",
		"Sanctum.png",
		"Selene.png",
		"Sentinel.png",
		"Shaohao.png",
		"Shire.png",
		"Shoompa.png",
		"Siege.png",
		"Simiao.png",
		"Skychurch.png",
		"Steampunk.png",
		"Strata.png",
		"Stronghold.png",
		"Submerged.png",
		"Sugar Rush.png",
		"Sunken.png",
		"Tain.png",
		"Teatime.png",
		"Tiki.png",
		"Toadstool.png",
		"Towers.png",
		"Tribal.png",
		"Tribute.png",
		"Triffids.png",
		"Tundra.png",
		"Ukishima.png",
		"Undead Isle.png",
		"Villa.png",
		"Waititi.png",
		"Waterways.png",
		"Winterhelm.png",
		"Winter Retreat.png",
		"Witch's Brew.png",
		"Workshop.png",
		"Wreath.png",
	];

	// Fetch country flag emoji JSON by code
	const [nats, setNats] = React.useState<string[]>([]);

	React.useEffect(() => {
		fetch("https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/by-code.json")
			.then((res) => res.json())
			.then((data) => {
				const arr = Object.values(data).map((item) => {
					const natItem = item as { name: string; emoji: string };
					return `${natItem.name} ${natItem.emoji}`;
				});
				setNats(arr);
			});
	}, []);

	const [background, setBackground] = React.useState<string | null>(null);
	const [nationality, setNationality] = React.useState<string | null>(null);
	const [emoji, setEmoji] = React.useState<string | null>(null);

	function updateProfile() {
		if (!user) return;

		const newUserProfile = {
			profile_bg: background,
			nationality: nationality,
			emoji: emoji,
		};

		console.log(newUserProfile);

		fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/updateUserInfo`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${profileToken}`,
			},
			body: JSON.stringify({ userData: newUserProfile }),
		})
			.then((res) => res.json())
			.then((data) => {
				alert("Profile updated!");
				console.log(data);
			})
			.catch((err) => {
				console.error("Failed to update profile:", err);
			});
	}

	return (
		<>
			{loading && (
				<div className="w-full h-80 flex justify-center text-center items-center text-3xl ">
					<LoaderCircle className="animate-spin"></LoaderCircle>
				</div>
			)}
			{error && <div>Error: {error.message}</div>}
			{!loading && !error && !user && <div>You are not logged in.</div>}
			{!loading && !error && user && typedUserInfo && (
				<>
					<div className="p-5 w-full flex flex-col gap-2">
						<PropertyCombobox
							title={"Profile Background"}
							explainText="The image shown on your MC account page"
							options={maps}
							initialValue={background ?? undefined}
							onChange={(value) => setBackground(value)}
						></PropertyCombobox>
						<PropertyCombobox
							title={"Nationality"}
							explainText="The country/flag shown on your MC account page"
							options={nats}
							initialValue={nationality ?? undefined}
							onChange={(value) => setNationality(value)}
						></PropertyCombobox>
						<PropertyStatic
							title="Patreon Status"
							explainText={"Whether this account has Patreon benefits"}
							value={profileUser?.patreon == true ? "Yes" : "No"}
						/>
						<PropertyInput
							title="Emoji"
							explainText={"Emoji to show on start page (Patreon only)"}
							placeholder={emoji ?? "None"}
							onChange={(value) => {
								setEmoji(value);
							}}
						/>

						<div className="w-full flex justify-center">
							<Button onClick={updateProfile}>Save</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProfileSettingsPage;
