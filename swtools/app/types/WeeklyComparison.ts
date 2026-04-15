import { Display } from "./OverallResponse";

export interface WeeklyComparisonResponse {
    success: boolean;
    week: string;
    stat: string;
    generatedAt: string;
    entries: WeeklyComparisonEntry[];
}

export interface WeeklyComparisonEntry {
    uuid: string;
    player: string;
    display: Display;
    delta: number;
    current: number;
    previous: number;
}
