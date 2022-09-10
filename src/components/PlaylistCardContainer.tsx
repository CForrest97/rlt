import React from "react";
import { useQueries, UseQueryResult } from "react-query";
import { motion } from "framer-motion";
import { getPlayer } from "../services/client/getPlayer";
import { Player, PlaylistName } from "../models/Player";
import { PlaylistCard } from "./PlaylistCard";

const comparePlayers =
  (playlistName: PlaylistName) => (a?: Player, b?: Player) =>
    (b?.playlists[playlistName].mmr ?? 0) -
    (a?.playlists[playlistName].mmr ?? 0);

type Props = {
  playerNames: string[];
  playlistName: PlaylistName;
};

export const PlaylistCardContainer: React.FC<Props> = ({
  playerNames,
  playlistName,
}) => {
  const queries = useQueries(
    playerNames.map((playerName) => ({
      queryKey: playerName,
      queryFn: () => getPlayer(playerName),
      refetchInterval: 30 * 1000,
    }))
  ) as UseQueryResult<Player>[];

  const sortedPlayerQueries = queries
    .map((query, i) => ({ query, playerName: playerNames[i] }))
    .sort((a, b) => comparePlayers(playlistName)(a.query.data, b.query.data));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
      }}
    >
      {sortedPlayerQueries.map(
        ({ query: { data, isFetching }, playerName }, i) => (
          <motion.div
            key={playerName}
            layout
            transition={{
              type: "keyframes",
            }}
            style={{ padding: "5px" }}
          >
            <PlaylistCard
              playerName={data?.username}
              playlist={data?.playlists[playlistName]}
              isFetching={isFetching}
            />
          </motion.div>
        )
      )}
    </div>
  );
};
