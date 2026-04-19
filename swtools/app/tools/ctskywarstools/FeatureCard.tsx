import React from "react";

type FeatureCardProps = {
	outsideText: string;
	imageSrc: string;
	imageAlt: string;
	insideText: string;
	cardOnLeft?: boolean;
	size?: "small" | "medium" | "large";
	title?: string;
};

const sizeClasses = {
	small: {
		card: "md:w-2/5",
		text: "md:w-3/5",
		image: "h-32",
	},
	medium: {
		card: "md:w-6/12",
		text: "md:w-6/12",
		image: "h-40",
	},
	large: {
		card: "md:w-7/12",
		text: "md:w-5/12",
		image: "h-56",
	},
} as const;

const FeatureCard = ({ outsideText, imageSrc, imageAlt, insideText, cardOnLeft = true, size = "medium", title }: FeatureCardProps) => {
	const classes = sizeClasses[size];

	return (
		<div className={`mx-auto flex w-full max-w-5xl items-center gap-6 ${cardOnLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}>
			<div className={`w-full rounded-2xl bg-content p-1.5 shadow-sm ${classes.card}`}>
				<img src={imageSrc} alt={imageAlt} className={`w-full rounded-xl object-cover ${classes.image}`} />
				<p className="pt-2 text-center text-xs font-semibold md:text-sm">{insideText}</p>
			</div>

			<div className={`w-full text-sm md:text-base ${classes.text}`}>
				<p className="mb-1 text-xl font-semibold md:text-2xl">{title}</p>
				<p className="leading-6">{outsideText}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
