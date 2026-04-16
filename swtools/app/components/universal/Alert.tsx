import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import React from "react";

type AlertVariant = "info" | "warning" | "error";

type AlertProps = {
	variant?: AlertVariant;
	title?: string;
	messages?: string[];
	className?: string;
	children?: React.ReactNode;
};

const variantStyles: Record<AlertVariant, { icon: React.ComponentType<{ className?: string }>; container: string; text: string }> = {
	info: {
		icon: Info,
		container: "bg-content",
		text: "text-gray-300",
	},
	warning: {
		icon: AlertTriangle,
		container: "bg-yellow-400/10 border border-yellow-400/30",
		text: "text-yellow-200",
	},
	error: {
		icon: AlertCircle,
		container: "bg-red-500/10 border border-red-500/30",
		text: "text-red-200",
	},
};


const Alert = ({ variant = "info", title, messages = [""], className = "", children }: AlertProps) => {
	const { icon: Icon, container, text } = variantStyles[variant];

	return (
		<div
			role="alert"
			className={`flex flex-row mx-auto w-full lg:w-100 gap-4 p-1 lg:p-2 text-sm font-semibold justify-center items-center rounded-lg mb-4 lg:mb-0 lg:rounded-3xl ${container} ${className}`}
		>
			<Icon className="h-8 w-8 hidden lg:block" />
			<div className={`flex flex-col items-center text-center ${text}`}>
				{title && <span className="font-bold">{title}</span>}
				{children ??
					messages.map((message) => (
						<span key={message}>{message}</span>
					))}
				{variant === "info" && <span className="lg:hidden text-red-400">On mobile: tap and hold!</span>}
			</div>
		</div>
	);
};

export default Alert;
