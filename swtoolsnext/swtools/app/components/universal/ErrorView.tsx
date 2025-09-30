import React from "react";
import Link from "next/link";
import ErrorViewBack from "./ErrorViewBack";
interface ErrorProps {
	statusText?: string;
	statusCode?: number;
}

const Error: React.FC<ErrorProps> = ({ statusText, statusCode }) => {
	return (
		<div className="w-full h-full bg-content flex flex-col justify-center items-center text-center p-4 text-red-300 font-semibold rounded-xl">
			{statusCode && <div className="text-8xl">{statusCode}</div>}
			{statusText && <div className="text-3xl">{statusText}</div>}
			<br />

			<ErrorViewBack></ErrorViewBack>
		</div>
	);
};

export default Error;
