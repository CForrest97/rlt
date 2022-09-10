/* eslint-disable no-undef */

import { Player, PlaylistName } from "../../models/Player";

export const getPlayer = async (username: string): Promise<Player> => {
  const response: PlayerResponse = await fetch(
    `https://rlt-api.craigforrest.co.uk/players/${username}`
  ).then((r) => r.json());

  const player: Player = {
    username: response.id,
    playlists: {
      solo: {
        name: "solo",
        mmr: response.playlists.duels.mmr,
        rank: response.playlists.duels.rank,
        deltaUp: response.playlists.duels.mmrRequiredForUpperDivision,
        deltaDown: response.playlists.duels.mmrRequiredForLowerDivision,
        winStreak: response.playlists.duels.winStreak,
        mmrChangeToday: response.playlists.duels.mmrChangeToday,
      },
      doubles: {
        name: "doubles",
        mmr: response.playlists.doubles.mmr,
        rank: response.playlists.doubles.rank,
        deltaUp: response.playlists.doubles.mmrRequiredForUpperDivision,
        deltaDown: response.playlists.doubles.mmrRequiredForLowerDivision,
        winStreak: response.playlists.doubles.winStreak,
        mmrChangeToday: response.playlists.doubles.mmrChangeToday,
      },
      standard: {
        name: "standard",
        mmr: response.playlists.standard.mmr,
        rank: response.playlists.standard.rank,
        deltaUp: response.playlists.standard.mmrRequiredForUpperDivision,
        deltaDown: response.playlists.standard.mmrRequiredForLowerDivision,
        winStreak: response.playlists.standard.winStreak,
        mmrChangeToday: response.playlists.standard.mmrChangeToday,
      },
      rumble: {
        name: "rumble",
        mmr: response.playlists.rumble.mmr,
        rank: response.playlists.rumble.rank,
        deltaUp: response.playlists.rumble.mmrRequiredForUpperDivision,
        deltaDown: response.playlists.rumble.mmrRequiredForLowerDivision,
        winStreak: response.playlists.rumble.winStreak,
        mmrChangeToday: response.playlists.rumble.mmrChangeToday,
      },
      dropshot: {
        name: "dropshot",
        mmr: response.playlists.dropshot.mmr,
        rank: response.playlists.dropshot.rank,
        deltaUp: response.playlists.dropshot.mmrRequiredForUpperDivision,
        deltaDown: response.playlists.dropshot.mmrRequiredForLowerDivision,
        winStreak: response.playlists.dropshot.winStreak,
        mmrChangeToday: response.playlists.dropshot.mmrChangeToday,
      },
    },
  };

  return player;
};

export type PlaylistId =
  | "duels"
  | "doubles"
  | "standard"
  | "hoops"
  | "rumble"
  | "dropshot"
  | "tournaments"
  | "snowday";

type Playlist = {
  id: string;
  mmr: number;
  rank: string;
  mmrRequiredForUpperDivision: number;
  mmrRequiredForLowerDivision: number;
  winStreak: number;
  mmrChangeToday: number;
};

export type PlayerResponse = {
  id: string;
  playlists: Record<PlaylistId, Playlist>;
};

type Rating = {
  timestamp: number;
  value: number;
};

export type RatingsResponse = {
  playerId: string;
  playlistId: string;
  ratings: Rating[];
};

const playlistNameToId = (name: PlaylistName): PlaylistId => {
  switch (name) {
    case "solo":
      return "duels";
    case "doubles":
      return "doubles";
    case "standard":
      return "standard";
    case "rumble":
      return "rumble";
    case "dropshot":
      return "dropshot";
    default:
      throw new Error(`playlist name "${name}" not recognised`);
  }
};

export const getRatings = async (
  username: string,
  playlist: PlaylistName
): Promise<Rating[]> => {
  const response: RatingsResponse = await fetch(
    `https://rlt-api.craigforrest.co.uk/players/${username}/${playlistNameToId(
      playlist
    )}`
  ).then((r) => r.json());

  return response.ratings;
};
