import { LoaderCircle } from "lucide-react";
import React from "react";
import ErrorView from "../components/universal/ErrorView";
import { redirect } from "next/navigation";

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const Page = async ({ searchParams }: PageProps) => {
	const awaitedParams = await searchParams;
	const uuid = awaitedParams.uuid as string;

	if (!uuid || uuid.length <= 20) {
		return <ErrorView statusText="Incorrect UUID"></ErrorView>;
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(uuid)}`);

	if (!res.ok) {
		return <ErrorView statusText={res.statusText} statusCode={res.status} />;
	}

	const data = await res.json();

	if (!data || !data.name) {
		return <ErrorView statusCode={404} statusText="Player not found"></ErrorView>;
	}

	const actualName = data?.name;
	redirect(`/player/${actualName}/stats/table`);

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-4">
			<LoaderCircle className="w-50 h-50 animate-spin"></LoaderCircle>
			<p className="text-xl font-semibold">Redirecting from UUID...</p>
		</div>
	);
};

export default Page;
