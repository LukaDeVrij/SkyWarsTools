import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentPlayerStoreActions {
	setRecentPlayers: (players: string[]) => void;
}

interface RecentPlayersStore extends RecentPlayerStoreActions {
	recentPlayers: string[];
}

export const useRecentPlayersStore = create<RecentPlayersStore>()(
	persist(
		(set) => ({
			recentPlayers: [],
			setRecentPlayers: (players: string[]) => set({ recentPlayers: players }),
		}),
		{
			name: "recent-players-storage", // unique name for localStorage
		}
	)
);
