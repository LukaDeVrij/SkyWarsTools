"use client";

import React, { useMemo, useState } from "react";
import useSWR from "swr";

import { fetcher } from "@/app/utils/Utils";

type ReleaseAsset = {
	browser_download_url?: string;
};

type Release = {
	tag_name: string;
	name: string;
	prerelease: boolean;
	html_url: string;
	assets?: ReleaseAsset[];
	zipball_url: string;
};

type ReleaseResponse = {
	success: boolean;
	releases: Release[];
};

const RELEASE_API_URL = "https://api.skywarstools.com/api/ct/lastVersion";

const CTSkyWarsToolsDownload = () => {
	const [includePrereleases, setIncludePrereleases] = useState(false);

	const { data, isLoading, error } = useSWR<ReleaseResponse>(RELEASE_API_URL, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const selectedRelease = useMemo(() => {
		const releases = data?.releases ?? [];
		const filteredReleases = includePrereleases ? releases : releases.filter((release) => !release.prerelease);
		return filteredReleases[0] ?? null;
	}, [includePrereleases, data?.releases]);

	const downloadUrl = selectedRelease?.assets?.[0]?.browser_download_url ?? selectedRelease?.zipball_url ?? null;
	const versionLabel = selectedRelease
		? `${selectedRelease.prerelease ? "Prerelease" : "Release"} ${selectedRelease.tag_name}`
		: "Download";

	return (
		<div className="my-5 mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl bg-content p-4 text-center shadow-lg lg:p-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold">Download</h2>
				<p className="max-w-xl text-sm leading-6 text-white/70">Download the latest GitHub release</p>
			</div>

			<label className="flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-black/20">
				<input
					type="checkbox"
					checked={includePrereleases}
					onChange={(event) => setIncludePrereleases(event.target.checked)}
					className="h-4 w-4 accent-white"
				/>
				<span>Include prereleases</span>
			</label>

			<div className="flex w-full flex-col items-center gap-2">
				{downloadUrl ? (
					<a
						href={downloadUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-button text-white w-full max-w-md rounded-xl shadow-md px-4 py-3 text-lg font-semibold cursor-pointer animate-press transition text-center sm:px-6 sm:text-2xl"
					>
						{isLoading ? "Loading release..." : versionLabel}
					</a>
				) : (
					<div className="w-full max-w-md rounded-xl shadow-md px-4 py-3 text-lg font-semibold text-center text-white opacity-80 sm:px-6 sm:text-2xl">
						{isLoading ? "Loading release..." : "No release available"}
					</div>
				)}
				<p className="text-xs">
					{selectedRelease
						? `This downloads the ${selectedRelease.prerelease ? "prerelease" : "stable"} GitHub download.`
						: "No release is available right now."}
				</p>
			</div>

			{error ? <p className="text-sm font-medium text-red-400">{error.message}</p> : null}

			<div className="max-w-xl rounded-xl bg-black/10 px-4 py-3 text-left text-sm leading-6 text-white/75">
				<p className="font-semibold text-white">Install instructions</p>
				<ol className="mt-2 list-decimal space-y-1 pl-5">
					<li>Download the archive from the button above.</li>
					<li>Open Minecraft and type /ct files, navigate to the modules folder</li>
					<li>Extract the ZIP-file into your ChatTriggers modules folder.</li>
					<li>The folder called &apos;CTSkyWarsTools&apos; should be in modules.</li>
					<li>In Minecraft, type /ct reload</li>
				</ol>
			</div>
		</div>
	);
};

export default CTSkyWarsToolsDownload;
