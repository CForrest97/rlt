import { Playlist } from "./Playlist";

export const playlistNames = [
  "solo",
  "doubles",
  "standard",
  "rumble",
  "dropshot",
  // "tournament",
] as const;

export type Player = {
  username: string;
  playlists: Record<PlaylistName, Playlist>;
};

export type PlaylistName = typeof playlistNames[number];
