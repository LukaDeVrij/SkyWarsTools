"use client";
import React from "react";
import { useState } from "react";
import Combobox from "react-widgets/cjs/Combobox";

type PropertyComboboxProps = {
	title: string;
	explainText?: string;
	initialValue?: string;
	options: string[];
	placeholder?: string;
};

const PropertyCombobox: React.FC<PropertyComboboxProps> = ({ title, explainText, initialValue, options, placeholder }) => {
	return (
		<div className="flex flex-row justify-between items-center rounded-lg w-full">
			<div>
				<div className="flex items-center">
					<strong className="text-lg">{title}</strong>
				</div>
				{explainText && <div className="text-sm text-gray-200 mt-[-6px]">{explainText}</div>}
			</div>
			<Combobox data={options} defaultValue={initialValue} placeholder={placeholder} />
			<span className="test">AAA</span>
		</div>
	);
};

export default PropertyCombobox;
