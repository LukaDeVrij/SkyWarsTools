"use client";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import React from "react";

interface CustomDatePickerProps {
	allSnapshots?: { queried: number; player: string }[];
	selectedSnapshots: number[];
	onChange: (snapshots: number[]) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ allSnapshots, selectedSnapshots, onChange }) => {
	const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth());
	const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear());
	const [openDay, setOpenDay] = React.useState<number | null>(null);

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Group snapshots by day
	const snapshotsByDay: Record<string, { queried: number; player: string }[]> = {};
	allSnapshots?.forEach((snap) => {
		const date = new Date(snap.queried);
		const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
		if (!snapshotsByDay[key]) snapshotsByDay[key] = [];
		snapshotsByDay[key].push(snap);
	});

	// Get days in month
	const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

	const handleDayClick = (day: number) => {
		const key = `${selectedYear}-${selectedMonth}-${day}`;
		if (snapshotsByDay[key]) setOpenDay(day);
	};

	const handleSnapshotSelect = (timestamp: number) => {
		let newSelected = [...selectedSnapshots];
		if (newSelected.includes(timestamp)) {
			newSelected = newSelected.filter((t) => t !== timestamp);
		} else {
			newSelected.push(timestamp);
		}
		onChange(newSelected);
		setOpenDay(null);
	};

	return (
		<div className="w-full max-w-xl mx-auto p-3 rounded-lg">
			<div className="flex items-start gap-4 mb-2">
				<button
					className="px-3 py-1 bg-content rounded animate-press cursor-pointer"
					onClick={() => setSelectedYear(selectedYear - 1)}
				>
					<ArrowLeft size={16} />
				</button>
				<span className="text-lg font-bold ">{selectedYear}</span>
				<button
					className="px-3 py-1 bg-content  rounded animate-press cursor-pointer"
					onClick={() => setSelectedYear(selectedYear + 1)}
				>
					<ArrowRight size={16} />
				</button>

				<button className="ml-auto text-base bg-content px-3 py-1 rounded font-semibold animate-press cursor-pointer" onClick={() => onChange([])}>
					Reset
				</button>
			</div>
			<div className="flex items-center mb-4 gap-2 ">
				<div className="flex text-xs w-full flex-wrap gap-1 ">
					{months.map((m, idx) => (
						<button
							key={m}
							className={`px-2 py-1 rounded animate-press cursor-pointer ${
								selectedMonth === idx ? "bg-button text-white" : "bg-content"
							}`}
							onClick={() => setSelectedMonth(idx)}
						>
							{m}
						</button>
					))}
				</div>
			</div>
			<div className="grid grid-cols-7 gap-2">
				{[...Array(daysInMonth)].map((_, i) => {
					const day = i + 1;
					const key = `${selectedYear}-${selectedMonth}-${day}`;
					const hasSnapshots = !!snapshotsByDay[key];
					return (
						<div key={day} className="relative">
							<button
								className={`w-full aspect-square rounded flex items-center justify-center font-bold text-base lg:text-xl 
									${hasSnapshots ? "bg-nav text-white border-2 animate-press cursor-pointer" : "bg-gray-700 text-gray-400"}
									${
										hasSnapshots && snapshotsByDay[key].some((snap) => selectedSnapshots.includes(snap.queried))
											? "border-green-400"
											: hasSnapshots
											? "border-white hover:border-green-400"
											: ""
									}
									${openDay === day ? "ring-2 ring-green-400" : ""}
								`}
								onClick={() => hasSnapshots && handleDayClick(day)}
								disabled={!hasSnapshots}
							>
								{day}
							</button>
							{openDay === day && hasSnapshots && (
								<div className="absolute z-10 top-0 left-0 w-40 bg-nav rounded shadow-lg p-2">
									<button className="text-sm mb-2 text-center text-gray-400 hover:text-white w-full flex justify-center" onClick={() => setOpenDay(null)}>
											<X />
									</button>
									{snapshotsByDay[key].map((snap) => (
										<button
											key={snap.queried}
											className={`block w-full text-center px-2 py-1 rounded mb-1 animate-press cursor-pointer font-semibold text-lg
												${selectedSnapshots.includes(snap.queried) ? "bg-green-500 text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700"}
											`}
											onClick={() => handleSnapshotSelect(snap.queried)}
										>
											{new Date(snap.queried).toLocaleTimeString()}
										</button>
									))}
									
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CustomDatePicker;
