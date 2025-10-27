import React from "react";

interface PropertyInputProps {
	title: string;
	explainText?: string;
	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;
	inputWidth?: number;
	disabled?: boolean;
}

const PropertyInput: React.FC<PropertyInputProps> = ({ title, explainText, value, onChange, placeholder, inputWidth, disabled }) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="flex justify-between items-start lg:items-center gap-2 mb-4 rounded-lg w-full flex-col lg:flex-row">
			<div>
				<div className="flex items-center">
					<strong className="text-lg">{title}</strong>
				</div>
				{explainText && <div className="text-sm text-gray-200 mt-[-6px]">{explainText}</div>}
			</div>
			<div className="flex items-center gap-2">
				<input
					className={`text-xl font-semibold px-2 py-1 rounded border w-` + inputWidth}
					value={value}
					onChange={handleInputChange}
					placeholder={placeholder}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default PropertyInput;
