import assert from "assert";
import { Profile } from "./fixtures/trackerProfile";
import { ranks } from "./fixtures/ranks";

const getUrl = (username: string) =>
  `https://api.tracker.gg/api/v2/rocket-league/standard/profile/psn/${username}`;

export type Stats = {
  soloPlaylist: Playlist;
  doublesPlaylist: Playlist;
  standardPlaylist: Playlist;
  rumblePlaylist: Playlist;
  dropshotPlaylist: Playlist;
  tournamentPlaylist: Playlist;
};

export type Playlist = {
  name: string;
  mmr: number;
  rank: string;
  deltaUp: number;
  deltaDown: number;
  winStreak: number;
};

const mapToPlaylist = (segment: Profile["data"]["segments"][0]): Playlist => {
  try {
    const mmr = segment.stats.rating?.value;

    assert(mmr);
    const tier: string = segment.stats.tier?.metadata.name!;
    const division: number = segment.stats.division?.value!;

    let deltaDown: number;
    let deltaUp: number;

    if (segment.metadata.name === "Ranked Doubles 2v2") {
      const { min, max } = ranks.find((rank) => rank.tier === tier)?.divisions[
        division
      ] as any;
      deltaDown = mmr - min + 1;
      deltaUp = max - mmr + 1;
    } else {
      deltaDown = segment.stats.division?.metadata.deltaDown ?? -0;
      deltaUp = segment.stats.division?.metadata.deltaUp ?? -0;
    }

    return {
      name: segment.metadata.name,
      mmr,
      rank: `${segment.stats.tier?.metadata.name} - ${segment.stats.division?.metadata.name}`,
      deltaDown,
      deltaUp,
      winStreak: parseInt(segment.stats.winStreak?.displayValue ?? "0", 10),
    };
  } catch (error) {
    return {
      name: segment.metadata.name,
      mmr: 0,
      rank: `${segment.stats.tier?.metadata.name} - ${segment.stats.division?.metadata.name}`,
      deltaDown: 0,
      deltaUp: 0,
      winStreak: parseInt(segment.stats.winStreak?.displayValue ?? "0", 10),
    };
  }
};

export const getStats = async (username: string): Promise<Stats> => {
  // eslint-disable-next-line no-undef
  const response = await fetch(getUrl(username), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0",
    },
  });

  const { data }: Profile = await response.json();

  const soloPlaylist = mapToPlaylist(
    data.segments.find((p) => p.metadata.name === "Ranked Duel 1v1") as any
  );
  const doublesPlaylist = mapToPlaylist(
    data.segments.find((p) => p.metadata.name === "Ranked Doubles 2v2") as any
  );
  const standardPlaylist = mapToPlaylist(
    data.segments.find((p) => p.metadata.name === "Ranked Standard 3v3") as any
  );
  const rumblePlaylist = mapToPlaylist(
    data.segments.find((p) => p.metadata.name === "Rumble") as any
  );
  const dropshotPlaylist = mapToPlaylist(
    data.segments.find((p) => p.metadata.name === "Dropshot") as any
  );
  const tournamentPlaylist = mapToPlaylist(
    data.segments.find((p) => p.metadata.name === "Tournament Matches") as any
  );

  assert(soloPlaylist);
  assert(doublesPlaylist);
  assert(standardPlaylist);
  assert(rumblePlaylist);
  assert(dropshotPlaylist);
  assert(tournamentPlaylist);

  return {
    soloPlaylist,
    doublesPlaylist,
    standardPlaylist,
    rumblePlaylist,
    dropshotPlaylist,
    tournamentPlaylist,
  };
};
