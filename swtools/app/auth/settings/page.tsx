"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import PropertyCombobox from "@/app/components/settings/PropertyCombobox";
import Button from "@/app/components/universal/Button";
import { useProfile } from "@/app/hooks/useProfile";
import PropertyStatic from "@/app/components/settings/PropertyStatic";
import PropertyInput from "@/app/components/settings/PropertyInput";
import ErrorView from "@/app/components/universal/ErrorView";
import Loading from "@/app/components/universal/Loading";
import Link from "next/link";

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
	"Desolate.png",
	"Desserted Islands.png",
	"Desolate.png",
	"Dire.png",
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
	"Garden Bed.png",
	"Garland.png",
	"Garrison.png",
	"Graveyard.png",
	"Glacier.png",
	"Glazed.png",
	"Graveyard.png",
	"Hanging Gardens.png",
	"Harmony.png",
	"Heaven Palace.png",
	"Helios.png",
	"Hibiscus.png",
	"Honeycomb.png",
	"Ice Bourne.png",
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
	"Scaremorial.png",
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
	"Trepid.png",
	"Tribal.png",
	"Tribute.png",
	"Triffids.png",
	"Tundra.png",
	"Ukishima.png",
	"Undead Isle.png",
	"Undergrowth.png",
	"Verglas.png",
	"Villa.png",
	"Waititi.png",
	"Waterways.png",
	"Winterhelm.png",
	"Winter Retreat.png",
	"Witch's Brew.png",
	"Workshop.png",
	"Wreath.png",
];

const fetchNationalities = async (): Promise<string[]> => {
	const res = await fetch("https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/by-code.json");
	const data = await res.json();
	return Object.values(data).map((item) => {
		const { name, emoji } = item as { name: string; emoji: string };
		return `${name} ${emoji}`;
	});
};

const ProfileSettingsPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [profileToken, setProfileToken] = React.useState<string | null>(null);
	const [nationalities, setNationalities] = React.useState<string[] | null>(null);
	const [background, setBackground] = React.useState<string | null>(null);
	const [nationality, setNationality] = React.useState<string | null>(null);
	const [emoji, setEmoji] = React.useState<string | null>(null);
	const [bio, setBio] = React.useState<string | null>(null);

	// Fetch ID token
	React.useEffect(() => {
		let isMounted = true;
		if (user) {
			user.getIdToken().then((token) => {
				if (isMounted) setProfileToken(token);
			});
		} else {
			setProfileToken(null);
		}
		return () => {
			isMounted = false;
		};
	}, [user]);

	// Fetch nationalities
	React.useEffect(() => {
		let isMounted = true;
		fetchNationalities().then((arr) => {
			if (isMounted) setNationalities(arr);
		});
		return () => {
			isMounted = false;
		};
	}, []);

	const { user: profileUser, isLoading: profileLoading } = useProfile(profileToken);

	// Set initial form values from profile
	React.useEffect(() => {
		if (profileUser) {
			setNationality(profileUser.nationality ?? null);
			setBackground(profileUser.profile_bg ?? null);
			setEmoji(profileUser.emoji ?? null);
			setBio(profileUser.bio ?? null);
		}
	}, [profileUser]);

	const isPageLoading = loading || profileLoading || !nationalities;

	async function updateProfile() {
		if (!user) return;
		const newUserProfile = {
			profile_bg: background,
			nationality: nationality,
			emoji: emoji,
			bio: bio,
		};
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/updateUserInfo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${profileToken}`,
				},
				body: JSON.stringify({ userData: newUserProfile }),
			});
			const data = await res.json();
			if (data.success !== true) {
				alert("Failed to update profile: " + (data.cause || "Unknown error"));
			} else {
				alert("Profile updated!");
			}
		} catch (err) {
			console.error("Failed to update profile:", err);
		}
	}

	if (isPageLoading) {
		return (
			<div className="w-full h-80 flex justify-center text-center items-center text-3xl ">
				<Loading />
			</div>
		);
	}

	if (error) {
		return <ErrorView statusText={error.cause as string} />;
	}

	if (!user) {
		return <ErrorView statusText="You must be logged in to view this page" statusCode={401} />;
	}

	return (
		<div className="p-5 w-full flex flex-col gap-2">
			<PropertyCombobox
				title={"Profile Background"}
				explainText="The image shown on your MC account page"
				options={maps}
				initialValue={profileUser?.profile_bg ?? undefined}
				onChange={setBackground}
			/>
			<PropertyCombobox
				title={"Nationality"}
				explainText="The country/flag shown on your MC account page"
				options={nationalities}
				initialValue={profileUser?.nationality ?? undefined}
				onChange={setNationality}
			/>
			<PropertyStatic
				title="Patreon Status"
				explainText={"Whether this account has Patreon benefits"}
				value={profileUser?.patreon === true ? "Yes" : "No"}
			/>
			{profileUser?.patreon === true && (
				<PropertyStatic
					title="Patreon Pledge"
					explainText={"If Patreon, cents per month donated (according to Patreon)"}
					value={profileUser?.patreon_cents}
				/>
			)}
			{profileUser?.contrib === true && (
				<PropertyStatic
					title="Contributor Status"
					explainText={"Contributors have Patreon benefits too!"}
					value={profileUser?.contrib === true ? "Yes" : "No"}
				/>
			)}
			{profileUser?.patreon === true || profileUser?.contrib === true ? (
				<>
					<PropertyInput
						title="Emoji"
						explainText={"Emoji to show on start page (Patreon only)"}
						placeholder={emoji ?? "None"}
						onChange={setEmoji}
						inputWidth={20}
					/>
					<PropertyInput
						title="Bio"
						explainText={"Bio to show on your account page (Patreon only)"}
						placeholder={profileUser?.bio ?? "None"}
						onChange={(value) => setBio(value)}
						inputWidth={80}
					/>
				</>
			) : (
				<div className="relative">
					<div className="opacity-50 pointer-events-none">
						<PropertyInput
							title="Emoji"
							explainText={"Emoji to show on start page (Patreon only)"}
							placeholder={emoji ?? "None"}
							onChange={() => {}}
							inputWidth={20}
							disabled={true}
						/>
						<PropertyInput
							title="Bio"
							explainText={"Bio to show on your account page (Patreon only)"}
							placeholder={profileUser?.bio ?? "None"}
							onChange={() => {}}
							inputWidth={80}
							disabled={true}
						/>
					</div>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 rounded px-3 py-1 text-white text-sm">
							<span role="img" aria-label="lock">
								🔒
							</span>
							<Link href="/patreon" className="cursor-pointer">
								Patreon Only!
							</Link>
						</div>
					</div>
				</div>
			)}
			<div className="w-full flex justify-center">
				<Button onClick={updateProfile}>Save</Button>
			</div>
		</div>
	);
};

export default ProfileSettingsPage;
