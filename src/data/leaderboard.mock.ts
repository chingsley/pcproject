import type {
  LeaderboardEntry,
  LeaderboardPanelTierLevel,
} from '../constants/leaderboard.constants';

type MockRow = Omit<LeaderboardEntry, 'isCurrentUser'>;

function tierRows(
  level: LeaderboardPanelTierLevel,
  topPoints: number,
  displayNames: readonly [string, string, string, string, string, string, string, string, string, string]
): MockRow[] {
  return displayNames.map((displayName, i) => ({
    id: `lb-l${level}-${i + 1}`,
    displayName,
    points: topPoints - i * 10,
  }));
}

/** Mock leaderboard rows per panel tier; 10 players, scores step down by 10 within each level. */
export const MOCK_LEADERBOARD_ENTRIES_BY_LEVEL: Record<LeaderboardPanelTierLevel, MockRow[]> = {
  1: tierRows(1, 100, [
    '@AlexR',
    'JordanChen2',
    'sam_f',
    'taylor.codes',
    'm0rganlee',
    'riley_q',
    'casey.dev',
    'averyJ',
    'quinn_m',
    'dakota_x',
  ]),
  2: tierRows(2, 200, [
    '@NikaT',
    'RiverSong8',
    'pixel_pete',
    'neo_wolf',
    'byteSized',
    'loop_li',
    'cache_me',
    'async_ava',
    'tuple_tom',
    'hash_tag',
  ]),
  3: tierRows(3, 300, [
    '@MiraLune',
    'Fragment9',
    'schema_sam',
    'vector_vic',
    'lambda_lex',
    'monoid_mo',
    'reduce_ray',
    'compose_k',
    'thunk_theo',
    'curry_k',
  ]),
  4: tierRows(4, 400, [
    '@OrionAlt',
    'Summit42',
    'pilot_pen',
    'forge_faye',
    'beacon_ben',
    'anchor_aj',
    'helm_han',
    'voyager_v',
    'crest_cai',
    'ridge_ro',
  ]),
  5: tierRows(5, 500, [
    '@ZenithZ',
    'GateNode1',
    'keystone_k',
    'archon_a',
    'sentinel_six',
    'warden_w2',
    'bastion_b',
    'citadel_c',
    'fortrex_f',
    'spire_s',
  ]),
};

export function getMockLeaderboardEntriesForLevel(
  level: LeaderboardPanelTierLevel
): MockRow[] {
  return MOCK_LEADERBOARD_ENTRIES_BY_LEVEL[level];
}
