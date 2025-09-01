"use client";
import React from "react";
import { useState } from "react";
import { Combobox } from "react-widgets/cjs";
import Button from "../universal/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

type PropertyComboboxProps = {
	title: string;
	explainText?: string;
	initialValue?: string;
	options: string[];
	placeholder?: string;
};

const PropertyCombobox: React.FC<PropertyComboboxProps> = ({ title, explainText, initialValue, options, placeholder }) => {
	const [background, setBackground] = React.useState<string | null>(null);
	const [user, loading, error] = useAuthState(auth);

	function updateProfileBG() {
		let updatedUserProfile: Partial<UserProfile> = {};
		if (background) {
			updatedUserProfile.profile_bg = background;
		}
		console.log(updatedUserProfile);
		if (!user) return;
		user.getIdToken().then((token) => {
			fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/updateUserInfo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ updatedUserProfile }),
			}).then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			});
		});
	}
	return (
		<div className="flex flex-row justify-between items-center rounded-lg w-full">
			<div>
				<div className="flex items-center">
					<strong className="text-lg">{title}</strong>
				</div>
				{explainText && <div className="text-sm text-gray-200 mt-[-6px]">{explainText}</div>}
			</div>
			<div className="flex flex-row gap-2 items-center">
				<Combobox data={options} defaultValue={initialValue} placeholder={placeholder} onChange={(value) => setBackground(value)} />
				{/*TODO Figure out how to style this combobox */}
				<Button onClick={updateProfileBG}>Set</Button>
			</div>
		</div>
	);
};

export default PropertyCombobox;
