"use client";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import CustomDatePicker from "@/app/components/player/selection/CustomDatePicker";
import useSWR from "swr";
import { fetcher } from "@/app/utils/Utils";
import { useParams } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { compareMap } from "@/app/utils/CompareStatsMap";

const statOptions = Object.keys(compareMap).map((key) => compareMap[key].label);
const statKeys = Object.keys(compareMap);

const goalOptions = [
	{ value: "statGoal", label: "To statistic goal" },
	{ value: "dateGoal", label: "To date" },
	{ value: "none", label: "Don't predict future" },
];

type SnapshotKeysResponse = {
	uuid: string;
	player: string;
	data: {
		queried: number;
		player: string;
	}[];
};

export default function CalculatePage() {
	const [user, loading, authError] = useAuthState(auth);

	const playerName = useParams().playerName as string;

	const { data, error, isLoading } = useSWR<SnapshotKeysResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/snapshotKeys?player=${playerName}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);
	const allSnapshots = data?.data;

	const [step, setStep] = useState(1);
	const [selectedStat, setSelectedStat] = useState(statKeys[0]);

	const [selectedSnapshots, setSelectedSnapshots] = useState<number[]>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("selectedSnapshots");
			if (saved) {
				try {
					return JSON.parse(saved);
				} catch {
					return [];
				}
			}
		}
		return [];
	});

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("selectedSnapshots", JSON.stringify(selectedSnapshots));
		}
	}, [selectedSnapshots]);

	const [customDatePickerOpen, setCustomDatePickerOpen] = useState(false);
	const [goalType, setGoalType] = useState("statGoal");
	const [statGoal, setStatGoal] = useState<number | undefined>();
	const [dateGoal, setDateGoal] = useState<string>("");

	const [selectionErrors, setSelectionErrors] = useState<string[]>([]);
	console.log(selectionErrors);
	function meetsRequirements(): boolean {
		setSelectionErrors([]);
		const errors: string[] = [];
		if (selectedSnapshots.length < 2) {
			errors.push("Please select at least two snapshots.");
		}
		if (goalType === "statGoal" && (!statGoal || statGoal <= 0)) {
			errors.push("Please enter a valid statistic goal.");
		}
		if (goalType === "dateGoal" && !dateGoal) {
			errors.push("Please enter a valid date goal.");
		}
		setSelectionErrors(errors);

		if (errors.length > 0) return false;

		// All checks passed
		return true;
	}
	const disabled = !user;

	return (
		<div className="bg-content w-full flex flex-col justify-center align-center p-4 rounded-b-xl">
			<h1 className="text-4xl font-bold text-center mb-2">Calculate Progress</h1>
			<span className="font-semibold text-center mb-5">Utilize snapshots to plot your progress of a certain stat!</span>
			<div className="steps bg-layer p-2 rounded-xl w-full lg:w-[60%] mx-auto">
				<div className="flex gap-2 mb-4 justify-center">
					{[1, 2, 3].map((s) => (
						<button
							key={s}
							className={`steps-nav animate-press-hard px-3 py-1 cursor-pointer border-2 border-transparent text-xl font-semibold rounded ${
								step === s ? "bg-nav border-white text-white" : "bg-content"
							}`}
							onClick={() => setStep(s)}
						>
							{s}
						</button>
					))}
				</div>

				{/* Step 1: Stat Selection */}
				{step === 1 && (
					<div className="setting p-4 flex flex-col items-center">
						<div className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 lg:gap-10">
							<div className="settings-text mb-2 text-center lg:text-left">
								<span className="font-bold text-xl">Stat to calculate</span>
								<br />
								<span className="text-sm">Choose which stat to use for the calculation</span>
							</div>
							<select
								name="stat"
								id="stat"
								className="w-52 h-12  p-2 rounded-xl text-xl bg-content font-semibold"
								value={selectedStat}
								onChange={(e) => setSelectedStat(e.target.value)}
							>
								{statKeys.map((stat, idx) => (
									<option key={stat} value={stat}>
										{statOptions[idx]}
									</option>
								))}
							</select>
						</div>
						<div
							className="mt-4 py-2 px-6 bg-button font-semibold text-3xl rounded transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 animate-press"
							onClick={() => setStep(2)}
						>
							Next
						</div>
					</div>
				)}

				{/* Step 2: Snapshot Selection */}
				{step === 2 && (
					<div className="calculateSnapshotSelection flex flex-col items-center w-full p-4">
						<div className="mb-4">
							<h3 className="font-bold text-lg mb-1 text-center">Select the timeframe to extrapolate with</h3>
							<p className="mb-2 text-sm text-center">
								In order to get an estimate of your progression, we need to have a start and end point. Additional snapshots
								in between can enhance prediction.
							</p>
						</div>
						<div id="selectionOptions" className="flex flex-col gap-2 mb-4">
							<div className="flex gap-2 justify-center mb-2 flex-wrap w-100">
								{[
									{ label: "Last 7", value: 7, title: "Auto-select the latest 7 snapshots" },
									{ label: "Last 14", value: 14, title: "Auto-select the latest 14 snapshots" },
									{
										label: "Last 21",
										value: 21,
										disabled: disabled,
										title: "Auto-select the latest 21 snapshots. Only available when logged in.",
									},
									{ label: "Past 7 days", value: "past7days", title: "Select all snapshots of the past 7 days" },
									{ label: "Past 14 days", value: "past14days", title: "Select all snapshots of the past 14 days" },
									{
										label: "14 overall spread",
										value: "overall14",
										title: "Select 14 snapshots, spread from the first ever to most recent",
									},
								].map((opt) => (
									<Tooltip key={opt.value} title={opt.title} placement="top">
										<span>
											<button
												className={`px-4 py-2 rounded-xl font-semibold border animate-press ${
													opt.disabled
														? "bg-content text-gray-600 opacity-60 cursor-not-allowed"
														: "bg-content text-white cursor-pointer"
												} flex items-center gap-1`}
												disabled={opt.disabled}
												onClick={() => {
													if (!opt.disabled) {
														if (opt.value === "past7days" || opt.value === "past14days") {
															const now = Date.now();
															const daysAgo =
																opt.value === "past7days"
																	? now - 7 * 24 * 60 * 60 * 1000
																	: now - 14 * 24 * 60 * 60 * 1000;
															const filtered =
																allSnapshots?.filter((s) => s.queried >= daysAgo).map((s) => s.queried) ??
																[];
															setSelectedSnapshots(filtered);
														} else if (opt.value === "overall14") {
															if (allSnapshots && allSnapshots.length >= 14) {
																const step = (allSnapshots.length - 1) / 13;
																const spread = Array.from(
																	{ length: 14 },
																	(_, i) => allSnapshots[Math.round(i * step)].queried
																);
																setSelectedSnapshots(spread);
															} else {
																setSelectedSnapshots(allSnapshots?.map((s) => s.queried) ?? []);
															}
														} else {
															setSelectedSnapshots(
																allSnapshots?.slice(0, Number(opt.value)).map((s) => s.queried) ?? []
															);
														}
													}
												}}
											>
												{opt.label}
											</button>
										</span>
									</Tooltip>
								))}
							</div>
							<div
								className="button bg-yellow-200/10 text-white px-3 py-2 font-semibold rounded-xl border cursor-pointer animate-press text-center"
								onClick={() => {
									setCustomDatePickerOpen(!customDatePickerOpen);
								}}
							>
								{customDatePickerOpen ? "Close Custom Date Picker" : "Open Custom Date Picker"}
							</div>
						</div>
						{customDatePickerOpen && (
							<>
								<div className="w-full mb-4">
									<CustomDatePicker
										allSnapshots={data?.data}
										selectedSnapshots={selectedSnapshots}
										onChange={setSelectedSnapshots}
									/>
								</div>
							</>
						)}
						<div className="mb-2 underline">
							<Tooltip title={selectedSnapshots.map((s) => new Date(s).toLocaleDateString()).join(", ")} placement="top">
								<strong>
									{selectedSnapshots.length === 0
										? "No snapshots selected"
										: `${selectedSnapshots.length} snapshots selected`}
								</strong>
							</Tooltip>
						</div>
						<div
							className="mt-4 py-2 px-6 bg-button font-semibold text-3xl rounded transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 animate-press"
							onClick={() => setStep(3)}
						>
							Next
						</div>
					</div>
				)}

				{/* Step 3: Other Settings */}
				{step === 3 && (
					<div className="setting p-4 flex flex-col items-center">
						<div className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 lg:gap-10 w-full">
							<div className="settings-text mb-2 text-center lg:text-left">
								<span className="font-bold text-xl">Plot mode</span>
								<br />
								<span className="text-sm">Whether to predict the future, if so, up to what goal</span>
							</div>
							<select
								name="goal"
								id="goal"
								className="w-52 h-12 p-2 rounded-xl text-xl bg-content font-semibold"
								value={goalType}
								onChange={(e) => setGoalType(e.target.value)}
							>
								{goalOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>
						<fieldset className="my-6 lg:my-2 w-full flex flex-col items-center">
							{goalType === "statGoal" && (
								<div className="flex items-center gap-2 w-full justify-between">
									<label htmlFor="statGoalInput" className="text-lg font-semibold">
										Plot up to Statistic Goal
									</label>
									<input
										type="number"
										id="statGoalInput"
										name="statGoalInput"
										className="rounded-xl px-2 py-1 text-xl bg-content font-semibold w-30"
										value={statGoal ?? ""}
										onChange={(e) => setStatGoal(Number(e.target.value))}
									/>
								</div>
							)}
							{goalType === "dateGoal" && (
								<div className="flex items-center gap-2 w-full justify-between">
									<label htmlFor="dateGoalInput" className="text-lg font-semibold">
										Plot up to Date
									</label>
									<input
										type="date"
										id="dateGoalInput"
										name="dateGoalInput"
										className=" rounded-xl px-2 py-1 text-xl bg-content font-semibold w-50 appearance-none"
										value={dateGoal}
										onChange={(e) => setDateGoal(e.target.value)}
									/>
								</div>
							)}
						</fieldset>

						<button
							className="mt-4 py-2 px-6 bg-button font-semibold text-3xl rounded transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 animate-press text-white"
							onClick={() => {
								if (meetsRequirements() == false) {
									console.log("Requirements not met");
									return;
								}
								let url = `/player/${playerName}/calculate/view?stat=${encodeURIComponent(
									selectedStat
								)}&k=${selectedSnapshots}`;
								if (goalType === "statGoal" && statGoal) {
									url += `&goalType=statGoal&statGoal=${statGoal}`;
								} else if (goalType === "dateGoal" && dateGoal) {
									url += `&goalType=dateGoal&dateGoal=${encodeURIComponent(dateGoal)}`;
								}
								window.open(url, "_blank", "noopener,noreferrer");
							}}
						>
							Calculate
						</button>
						{/* TODO fix unstateful state selectionErrors - then we can only show thius when selectionErrors > 0*/}
						{selectionErrors.length >= 1 && (
							<div className="errors mt-6 rounded-xl bg-red-300 p-2 text-red-900 font-semibold">
								{selectionErrors.map((err, idx) => (
									<p key={idx}>{err}</p>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
