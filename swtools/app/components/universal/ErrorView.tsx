import React from "react";
import ErrorViewBack from "./ErrorViewBack";
interface ErrorProps {
	statusText?: string;
	statusCode?: number | string;
}

const Error: React.FC<ErrorProps> = ({ statusText, statusCode }) => {
	return (
		<div className="w-full h-full bg-content flex flex-col justify-center items-center text-center p-4 text-red-300 font-semibold rounded-xl">
			{!statusCode && !statusText ? (
				<>
					<div className="text-3xl">Something went wrong!</div>
					<p>Not supposed to happen? Report on Discord</p>
					<br />
					<ErrorViewBack />
				</>
			) : (
				<>
					<div className={`mb-4 ${typeof statusCode === "number" ? "text-8xl" : "text-5xl"}`}>{statusCode}</div>
					{statusText && <div className="text-2xl">{statusText}</div>}
					<br />
					<ErrorViewBack />
				</>
			)}
		</div>
	);
};

export default Error;
