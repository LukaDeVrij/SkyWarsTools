import React from "react";
import Link from "next/link";
interface ErrorProps {
	statusText?: string;
	statusCode?: number;
}

const Error: React.FC<ErrorProps> = ({ statusText, statusCode }) => {
	return (
		<div className="w-full h-full bg-content flex flex-col justify-center items-center text-center p-4 text-red-300 font-semibold">
			{statusCode && <div>Status Code: {statusCode}</div>}
			{statusText && <div>Status Text: {statusText}</div>}
			<br />
			<Link className="text-white underline" href="/">
				Back to home
			</Link>
		</div>
	);
};

export default Error;
