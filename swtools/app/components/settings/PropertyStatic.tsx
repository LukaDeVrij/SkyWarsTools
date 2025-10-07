import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface PropertyStaticProps {
	title: string;
	explainText?: string;
	value: React.ReactNode;
	hideValue?: boolean;
}

const PropertyStatic: React.FC<PropertyStaticProps> = ({ title, explainText, value, hideValue }) => {
	return (
		<div className="flex justify-between items-center rounded-lg w-full">
			<div>
				<div className="flex items-center">
					<strong className="text-lg">{title}</strong>
				</div>
				{explainText && <div className="text-sm text-gray-200 mt-[-6px]">{explainText}</div>}
			</div>
			{hideValue ? <ToggleValue value={value} /> : <div className="text-xl font-semibold">{value}</div>}
		</div>
	);
};

const ToggleValue: React.FC<{ value: React.ReactNode }> = ({ value }) => {
	const [visible, setVisible] = React.useState(false);

	const handleToggle = () => {
		setVisible((prev) => {
			const next = !prev;
			if (!prev && value !== undefined) {
				console.log(value);
			}
			return next;
		});
	};

	return (
		<div className="flex items-center gap-2">
			<div className="text-xl font-semibold">{visible ? value : "••••••••••••••••••••••••"}</div>
			<button onClick={handleToggle} className="text-sm text-[var(--accent)] hover:underline cursor-pointer">
				{visible ? <EyeOff /> : <Eye />}
			</button>
		</div>
	);
};

export default PropertyStatic;
