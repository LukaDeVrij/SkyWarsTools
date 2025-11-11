export interface DescentMap {
	avarice: DescentItem;
	projectiletrail_kings: DescentItem;
	grand_slam: DescentItem;
	tenacity: DescentItem;
	shard_seeker: DescentItem;
	emblem_sigma_icon: DescentItem;
	meticulous_miner: DescentItem;
	hide_and_seek: DescentItem;
	killeffect_vaporized: DescentItem;
	midas_gift: DescentItem;
	angels_offering: DescentItem;
	killmessages_flex: DescentItem;
	first_blood: DescentItem;
	fortune_teller: DescentItem;
	fireproof: DescentItem;
	cage_piston: DescentItem;
	corrupted_coinage: DescentItem;
	librarian: DescentItem;
	luckier_charm: DescentItem;
	apothecary: DescentItem;
	victorydance_super_sheep: DescentItem;
	cloak_falling_angel: DescentItem;
	killeffect_purple_tornado: DescentItem;
	sorcerers_spell: DescentItem;
	fruit_finder: DescentItem;
	ender_end_game: DescentItem;
	smarty_pants: DescentItem;
	killmessages_rainbow: DescentItem;
	diamond_in_the_rough: DescentItem;
	telekinesis: DescentItem;
	cage_balancing_act: DescentItem;
	distillery_discount: DescentItem;
	chilled_quiver: DescentItem;
	archeologist_kit_opal: DescentItem;
	opalsmith: DescentItem;
	double_edged_sword: DescentItem;
	quest_masters_friend: DescentItem;
	dragons_pledge: DescentItem;
	balloon_dual_dragon: DescentItem;
	deathcry_eponymous_dragon: DescentItem;
	kill_xp_boost: DescentItem;
	perk_slot: DescentItem;
	projectiletrail_descent_dragon: DescentItem;
	emblem_delta_icon: DescentItem;
	victorydance_double_dragons_descent: DescentItem;
	cloak_angels_prestige: DescentItem;
	scheme_demigod: DescentItem;
	fallen_angel_kit: DescentItem;
}

export interface DescentItem {
	title: string;
	slot: number;
	image: string;
	subtitle: string;
	tiers: Tier[];
	maxText: string;
	playerOwns?: boolean | number;
	requires?: number;
}

export interface Tier {
	text: string;
	cost: number;
}
