import {
  Card,
  Typography,
  CardContent,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import React, { FC } from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useRouter } from "next/dist/client/router";
import { Playlist } from "../models/Playlist";

type Props = {
  playerName?: string;
  playlist?: Playlist;
  isFetching: boolean;
};

export const PlaylistCard: FC<Props> = ({
  playerName,
  playlist,
  isFetching,
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push({ query: router.query, pathname: `/players/${playerName}` });
  };
  return (
    <Card
      onClick={onClick}
      sx={{ minWidth: 275, position: "relative" }}
      variant="outlined"
    >
      {isFetching && (
        <CircularProgress
          sx={{ position: "absolute", right: "10px", top: "10px" }}
        />
      )}
      <CardContent>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          {playerName ?? <Skeleton variant="text" width={150} />}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {playlist?.rank ?? <Skeleton variant="text" width={150} />}
        </Typography>
        {
          <Typography
            sx={{
              color: "green",
              visibility: playlist?.deltaUp ? "visible" : "hidden",
            }}
          >
            <ArrowUpward />
            {playlist?.deltaUp}
          </Typography>
        }
        <Typography variant="h3">
          {playlist?.mmr ?? <Skeleton variant="text" width={100} />}
        </Typography>
        {
          <Typography
            variant="h6"
            sx={{
              color: "red",
              visibility: playlist?.deltaDown ? "visible" : "hidden",
            }}
          >
            <ArrowDownward />
            {playlist?.deltaDown}
          </Typography>
        }
        {playlist?.winStreak && playlist?.winStreak > 0 && (
          <Typography
            variant="body2"
            sx={{
              color: "green",
            }}
          >
            {`Win streak: ${Math.abs(playlist.winStreak)}`}
          </Typography>
        )}
        {playlist?.winStreak && playlist.winStreak < 0 && (
          <Typography
            variant="body2"
            sx={{
              color: "red",
            }}
          >
            {`Loss streak: ${Math.abs(playlist.winStreak)}`}
          </Typography>
        )}
        {playlist && (
          <Typography
            variant="body2"
            sx={{
              color:
                playlist.mmrChangeToday === 0
                  ? undefined
                  : playlist.mmrChangeToday > 0
                  ? "green"
                  : "red",
            }}
          >
            {`MMR change today: ${playlist.mmrChangeToday}`}
          </Typography>
        )}
        {playlist === undefined && (
          <Typography variant="body2">
            <Skeleton variant="text" width={70} />
            <Skeleton variant="text" width={70} />
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
