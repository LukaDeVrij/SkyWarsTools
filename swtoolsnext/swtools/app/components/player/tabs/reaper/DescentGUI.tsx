import React from "react";
import type { DescentItem, DescentMap } from "@/app/types/DescentMap";
import MinecraftText from "@/app/utils/MinecraftText";
import { romanize } from "@/app/utils/Utils";

const DescentGUI: React.FC<{ combinedData: DescentMap }> = ({ combinedData }) => {
	// Lotta helper function here - way better than to have it in the JSX
	// Partially ported from JS
	function getSlotBackground(item: DescentItem | undefined): string {
		if (!item) return `url('/ranked/invSlot.png')`;
		if (item.playerOwns === false) {
			return `url('/ranked/invSlotLocked.png')`;
		}
		if (typeof item.playerOwns === "number" && item.tiers && item.playerOwns < item.tiers.length) {
			return `url('/ranked/invSlotProgressed.png')`;
		}
		if (item.playerOwns === true) {
			return `url('/ranked/invSlot.png')`;
		}

		return `url('/ranked/invSlot.png')`;
	}

	function getItemDescription(item: DescentItem): string | undefined {
		const playerOwns = item.playerOwns;
		let tier = 0;
		let explainText: string | undefined;

		if (typeof playerOwns === "boolean") {
			tier = 0;
		} else if (typeof playerOwns === "number") {
			tier = playerOwns;
		}

		let tiered = false;
		let maxTier = 0;
		if (item.tiers && item.tiers.length > 1) {
			tiered = true;
			maxTier = item.tiers.length;
		}

		if (tiered) {
			if (tier === maxTier) {
				explainText = item.maxText;
			} else if (tier !== 0) {
				explainText = item.tiers[tier]?.text;
			} else {
				explainText = item.tiers[tier]?.text;
			}
		} else {
			explainText = item.tiers?.[0]?.text;
		}

		return explainText;
	}

	function getItemCostText(item: DescentItem): string | undefined {
		const playerOwns = item.playerOwns;
		let tier = 0;
		let costText: string | undefined;

		if (typeof playerOwns === "boolean") {
			tier = 0;
		} else if (typeof playerOwns === "number") {
			tier = playerOwns;
		}

		let tiered = false;
		let maxTier = 0;
		if (item.tiers && item.tiers.length > 1) {
			tiered = true;
			maxTier = item.tiers.length;
		}

		if (tiered) {
			if (tier === maxTier) {
				costText = "§aUNLOCKED";
			} else if (tier !== 0) {
				costText = `§7Cost: ${item.tiers[tier]?.cost} §9Opals`;
				if (item.tiers[tier]?.cost === 1) costText = costText.replace("Opals", "Opal");
			} else {
				costText = `§7Cost: ${item.tiers[tier]?.cost} §9Opals`;
				if (item.tiers[tier]?.cost === 1) costText = costText.replace("Opals", "Opal");
			}
		} else {
			if (playerOwns) {
				costText = "§aUNLOCKED";
			} else {
				costText = `§7Cost: ${item.tiers?.[0]?.cost} §9Opals`;
				if (item.tiers?.[0]?.cost === 1) costText = costText.replace("Opals", "Opal");
			}
		}

		return costText;
	}

	function getItemTitle(item: DescentItem): string {
		const playerOwns = item.playerOwns;
		let tier = 0;
		let titleText = item.title;

		if (typeof playerOwns === "boolean") {
			tier = 0;
		} else if (typeof playerOwns === "number") {
			tier = playerOwns;
		}

		let tiered = false;
		let maxTier = 0;
		if (item.tiers && item.tiers.length > 1) {
			tiered = true;
			maxTier = item.tiers.length;
		}

		if (tiered) {
			if (tier === maxTier) {
				titleText = `§a${titleText} §a${romanize(tier)} §7(Maxed)`;
			} else if (tier !== 0) {
				titleText = `§e${titleText} §e${romanize(tier)}/§7${romanize(maxTier)}`;
			} else {
				titleText = `§c${titleText} §7(${maxTier} Tiers)`;
			}
		} else {
			if (playerOwns) {
				titleText = `§a${titleText}`;
			} else {
				titleText = `§c${titleText}`;
			}
		}

		return titleText;
	}
	// Thus concludes the helper functions

	return (
		<div className="grid grid-cols-7 gap-0.2 min-w-10 min-h-10 w-auto h-auto">
			{Array.from({ length: 18 * 7 }, (_, i) => {
				i = i + 1;
				const item: DescentItem | undefined = Object.values(combinedData).find((it: DescentItem) => it.slot === i);

				return (
					<div
						key={i}
						className="flex items-center justify-center h-13 w-13 bg-cover bg-center relative"
						style={{
							backgroundImage: getSlotBackground(item),
						}}
					>
						{item ? (
							<>
								<div className="">
									<img
										src={"/items/" + item.image}
										height={50}
										width={50}
										style={{ imageRendering: "pixelated" }}
										className="p-0.5 peer"
										alt=""
										tabIndex={0}
										onClick={(e) => {
											const tooltip = e.currentTarget.nextSibling as HTMLElement;
											if (tooltip) {
												tooltip.classList.toggle("opacity-100");
												tooltip.classList.toggle("pointer-events-auto");
											}
										}}
										onBlur={(e) => {
											const tooltip = e.currentTarget.nextSibling as HTMLElement;
											if (tooltip) {
												tooltip.classList.remove("opacity-100");
												tooltip.classList.remove("pointer-events-auto");
											}
										}}
									/>
									<div
										className="fixed lg:absolute bottom-0 lg:bottom-11/12 left-0 lg:left-11/12 w-full lg:w-100 p-2 rounded items-center justify-center opacity-0 group-hover:opacity-100 peer-hover:opacity-100 transition-opacity bg-black/90 z-10 text-xl text-white text-left pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
										tabIndex={-1}
									>
										<MinecraftText>{getItemTitle(item)}</MinecraftText>
										<MinecraftText>{item.subtitle}</MinecraftText>
										<MinecraftText>{getItemDescription(item)}</MinecraftText>
										<MinecraftText>{getItemCostText(item)}</MinecraftText>
									</div>
								</div>
							</>
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default DescentGUI;
