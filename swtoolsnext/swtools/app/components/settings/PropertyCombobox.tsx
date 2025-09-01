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
	dataKey?: string;
	onChange: (value: string) => void;
};

const PropertyCombobox: React.FC<PropertyComboboxProps> = ({
	title,
	explainText,
	initialValue,
	options,
	placeholder,
	dataKey,
	onChange,
}) => {
	return (
		<div className="flex flex-row justify-between items-center rounded-lg w-full">
			<div>
				<div className="flex items-center">
					<strong className="text-lg">{title}</strong>
				</div>
				{explainText && <div className="text-sm text-gray-200 mt-[-6px]">{explainText}</div>}
			</div>
			<div className="flex flex-row gap-2 items-center">
				<Combobox data={options} defaultValue={initialValue} placeholder={placeholder} dataKey={dataKey} onChange={onChange} />
			</div>
		</div>
	);
};

export default PropertyCombobox;
