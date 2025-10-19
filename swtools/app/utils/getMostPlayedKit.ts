
import { OverallResponse } from "../types/OverallResponse";
import { kitProcessing } from "./Utils";

export default function getMostPlayedKit(statsData: OverallResponse | null | undefined): string | null {
    if (!statsData) return null;
    // check statsData.stats for object keys that contain wins_kit_ then check the value and return the name of the kit with the highest wins
    const wins_kit = Object.keys(statsData?.stats ?? {}).filter(key => key.includes("time_played_kit_")).filter(key => !key.includes("_mini_")).reduce((max, key) => {
        const currentValue = statsData?.stats[key as keyof typeof statsData.stats];
        const numValue = typeof currentValue === 'number' ? currentValue : 0;
        return numValue > max.value ? { kit: key, value: numValue } : max;
    }, { kit: '', value: 0 });
    // GET THE name of the kit get the last part after the last _
    const best_kit = kitProcessing(wins_kit.kit.split("_").pop()?.replace("-", " ") ?? '');
    return best_kit;
}