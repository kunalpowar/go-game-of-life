export interface MatchStatsJSON {
  kills?: number;
  assists?: number;
  deaths?: number;
  mvps?: number;
  score?: number;
}

export interface PlayerStateJSON {
  health?: number;
  armor?: number;
  helmet?: boolean;
  defusekit?: boolean;
  flashed?: number;
  smoked?: number;
  burning?: number;
  money?: number;
  round_kills?: number;
  round_killhs?: number;
  equip_value?: number;
}

export interface WeaponJSON {
  name?: string;
  paintkit?: string;
  type?: string;
  ammo_clip?: number;
  ammo_clip_max?: number;
  ammo_reserve?: number;
  state?: string;
}

interface TeamJSON {
  score?: number;
  timeouts_remaining?: number;
  matches_won_this_series?: number;
}

export interface PhaseCountdownsJSON {
  phase?: string;
  phase_ends_in?: string;
}

export interface PlayerJSON {
  steamid?: string;
  clan?: string;
  name?: string;
  observer_slot?: number;
  team?: string;
  state?: PlayerStateJSON;
  match_stats?: MatchStatsJSON;
  weapons?: WeaponJSON[];
}

export interface PlayerInFocusJSON {
  steamid?: string;
  clan?: string;
  name?: string;
  observer_slot?: number;
  team?: string;
  activity?: string;
  state?: PlayerStateJSON;
}

export interface MapStateJSON {
  mode?: string;
  name?: string;
  phase?: string;
  round?: number;
  team_ct?: TeamJSON;
  team_t?: TeamJSON;
  num_matches_to_win_series?: number;
  current_spectators?: number;
  souvenirs_total?: number;
}

export interface RoundStateJSON {
  phase?: string;
  win_team?: string;
  bomb?: string;
}

export interface GameStateJSON {
  map?: MapStateJSON;
  round?: RoundStateJSON;
  player?: PlayerInFocusJSON;
  allplayers?: PlayerJSON[];
  phase_countdowns?: PhaseCountdownsJSON;
}
