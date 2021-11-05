import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useQuery } from "react-query";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { getStats, Stats } from "../services/server/getStats";
import { getStats as getStatsClient } from "../services/client/getStats";
import { StatsCard } from "../components/StatsCard";
import { queryClient } from "./_app";

type Props = {
  craigsStats: Stats;
  adamsStats: Stats;
};

const Homepage: NextPage<Props> = (props) => {
  const { data: craigsStats, isFetching: isFetchingCraig } = useQuery(
    "CForrest97",
    () => getStatsClient("CForrest97"),
    { placeholderData: props.craigsStats, refetchInterval: 30 * 1000 }
  );
  const { data: adamsStats, isFetching: isFetchingAdam } = useQuery(
    "AJRBond007",
    () => getStatsClient("AJRBond007"),
    { placeholderData: props.adamsStats, refetchInterval: 30 * 1000 }
  );

  const router = useRouter();
  const { p } = router.query;
  if (!craigsStats || !adamsStats) {
    return <span>Loading...</span>;
  }
  const playlist: keyof Stats = Object.keys(craigsStats).includes(p as string)
    ? (p as keyof Stats)
    : "doublesPlaylist";

  const players = [
    { stats: craigsStats, isFetching: isFetchingCraig, username: "CForrest97" },
    { stats: adamsStats, isFetching: isFetchingAdam, username: "AJRBond007" },
  ].sort((a, b) => b.stats[playlist].mmr - a.stats[playlist].mmr);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
      }}
    >
      {players.map((player) => (
        <div style={{ margin: "5px" }} key={player.username}>
          <StatsCard
            username={player.username}
            playlist={player.stats[playlist]}
            isLoading={player.isFetching}
          />
        </div>
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <Button
          onClick={() => {
            queryClient.invalidateQueries();
          }}
          variant="contained"
        >
          Force refresh
        </Button>
        <Typography sx={{ m: 1.5 }} color="text.secondary" gutterBottom>
          Automatically refreshing every 30 seconds
        </Typography>
      </div>
    </div>
  );
};

export default Homepage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [craigsStats, adamsStats] = await Promise.all([
    getStats("CForrest97"),
    getStats("AJRBond007"),
  ]);

  return {
    props: {
      craigsStats,
      adamsStats,
    },
  };
};
