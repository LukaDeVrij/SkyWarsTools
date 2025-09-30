import React from "react";

interface TitleProps {
	color: string;
	children: React.ReactNode;
}
const Title: React.FC<TitleProps> = ({ children, color }) => {
	return <span className={`text-xl font-semibold ${color}`}>{children}</span>;
};

export default Title;
