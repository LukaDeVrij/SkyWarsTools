export function extractKitMaxPrestige(kitsMaxPrestige: string): number {
    try {
        if (kitsMaxPrestige === undefined || kitsMaxPrestige === null) {
            return 0;
        }
        // Match the number before the slash inside the brackets, e.g. §2[§a1/131§d⚔§2]
        // The number can be any value up to 131
        // Regex: /(\d{1,3})\//
        let match = kitsMaxPrestige.match(/(\d{1,3})\//);
        return match ? parseInt(match[1]) : 0;
    } catch (err) {
        return 0;
    }
}