import {
  Card,
  Box,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";
import React, { FC } from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Playlist } from "../services/server/getStats";

export const StatsCard: FC<{
  username: string;
  playlist: Playlist;
  isLoading: boolean;
}> = ({ username, playlist, isLoading }) => (
  <Card sx={{ minWidth: 275, position: "relative" }} variant="outlined">
    {isLoading && (
      <CircularProgress
        sx={{ position: "absolute", right: "10px", top: "10px" }}
      />
    )}
    <CardContent>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        {username}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {playlist.rank}
      </Typography>
      {
        <Typography
          variant="h6"
          sx={{
            color: "green",
            visibility: playlist.deltaUp ? "visible" : "hidden",
          }}
        >
          <ArrowUpward />
          {playlist.deltaUp}
        </Typography>
      }
      <Typography variant="h3">{playlist.mmr}</Typography>
      {
        <Typography
          variant="h6"
          sx={{
            color: "red",
            visibility: playlist.deltaDown ? "visible" : "hidden",
          }}
        >
          <ArrowDownward />
          {playlist.deltaDown}
        </Typography>
      }
      {playlist.winStreak > 0 && (
        <Typography
          variant="body2"
          sx={{
            color: "green",
          }}
        >
          {`Win streak: ${Math.abs(playlist.winStreak)}`}
        </Typography>
      )}
      {playlist.winStreak < 0 && (
        <Typography
          variant="body2"
          sx={{
            color: "red",
          }}
        >
          {`Loss streak: ${Math.abs(playlist.winStreak)}`}
        </Typography>
      )}
    </CardContent>
  </Card>
);
