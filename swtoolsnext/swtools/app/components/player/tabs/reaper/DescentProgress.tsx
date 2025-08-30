import ProgressBar, { ProgressBarMode } from "@/app/components/universal/ProgressBar";
import Title from "@/app/components/universal/Title";
import { OverallResponse } from "@/app/types/OverallResponse";
import { calculateCraftableOpals } from "@/app/utils/Utils";
import React from "react";

const DescentProgress: React.FC<{ response: OverallResponse; opalsSpent: number }> = ({ response, opalsSpent }) => {
	return (
		<div className="w-full h-auto bg-content rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
			<Title color="text-blue-400">Angel&apos;s Descent Progress</Title>
			<table className="text-lg w-full">
				<tbody>
					<tr>
						<td>Current Opals</td>
						<td className="">{response.stats.opals}</td>
						<td></td>
					</tr>
					<tr>
						<td>Opalsmith</td>
						<td className={` ${response.stats.opalsmith === 1 ? "text-green-600" : ""}`}>
							{response.stats.opalsmith ? "Unlocked" : "Locked"}
						</td>
						<td></td>
					</tr>

					<tr>
						<td>Opals Spent</td>
						<td className={` ${opalsSpent === 410 ? "text-green-600" : ""}`}>{opalsSpent} / 410</td>
						<td></td>
					</tr>
					<tr>
						<td colSpan={2} className="pb-3">
							<span className="text-sm">Descent Progress</span>
							<ProgressBar
								progress={opalsSpent}
								total={410}
								bgColor="#424242"
								progressColor="magenta"
								decimals={0}
								mode={ProgressBarMode.PERCENTAGE_ONLY}
							></ProgressBar>
						</td>
					</tr>
					<tr>
						<td>Souls</td>
						<td className="">{response.stats.souls?.toLocaleString()}</td>
						<td></td>
					</tr>
					<tr>
						<td>Forgeable Opals</td>
						<td className="">{calculateCraftableOpals(response.stats.souls ?? 0, response.stats.opalsmith ?? 0)}</td>
						<td></td>
					</tr>
					<tr>
						<td colSpan={2} className="pb-2">
							<span className="text-sm">Opal Forge Progress</span>
							<ProgressBar
								progress={response.stats.souls ?? 0}
								total={response.stats.opalsmith == 1 ? 1250 : 1500}
								bgColor="#424242"
								progressColor="#2090ff"
								mode={ProgressBarMode.PERCENTAGE_ONLY}
								decimals={0}
							></ProgressBar>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default DescentProgress;
