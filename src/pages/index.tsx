import React from "react";
import { NextPage } from "next";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
import { queryClient } from "./_app";
import { PlaylistName, playlistNames } from "../models/Player";
import { PlaylistCardContainer } from "../components/PlaylistCardContainer";

const PLAYER_NAMES = ["CForrest97", "AJRBond007"];
const Homepage: NextPage = () => {
  const router = useRouter();
  const { p } = router.query;

  const playlistName: PlaylistName = playlistNames.includes(p as PlaylistName)
    ? (p as PlaylistName)
    : "doubles";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
      }}
    >
      <PlaylistCardContainer
        playerNames={PLAYER_NAMES}
        playlistName={playlistName}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              queryClient.invalidateQueries();
            }}
            variant="contained"
            className="z-20"
          >
            Force refresh
          </Button>
        </motion.button>
        <Typography
          className="text-center"
          sx={{ m: 1.5 }}
          color="text.secondary"
          gutterBottom
        >
          Automatically refreshing every 30 seconds
        </Typography>
      </div>
    </div>
  );
};

export default Homepage;
