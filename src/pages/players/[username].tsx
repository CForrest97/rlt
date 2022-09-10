import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { PlaylistName, playlistNames } from "../../models/Player";
import { getRatings } from "../../services/client/getPlayer";

import "chartjs-adapter-luxon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const PlayerPage: NextPage = () => {
  const router = useRouter();
  const [isSessionMode, setIsSessionMode] = useState(false);

  const { username, p } = router.query;

  const playlistName: PlaylistName = playlistNames.includes(p as PlaylistName)
    ? (p as PlaylistName)
    : "doubles";

  const { data: ratings } = useQuery(
    ["ratings", username, playlistName],
    () => getRatings(username as string, playlistName),
    { keepPreviousData: true }
  );

  const options = {
    tension: 0.4,
    scales: {
      xAxis: {
        type: "time",
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${username}'s ${playlistName} rank `,
      },
    },
  };

  if (!ratings) {
    return <div>loading</div>;
  }

  const stats = isSessionMode
    ? ratings.filter(
        (rating) =>
          rating.timestamp > new Date().valueOf() - 24 * 60 * 60 * 1000
      )
    : ratings;

  const data = {
    datasets: [
      {
        label: username,
        data: stats.map((rating) => ({
          x: rating.timestamp,
          y: rating.value,
        })),
        showLine: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex-col items-center">
      <Scatter options={options as any} data={data as any} />
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
              setIsSessionMode((mode) => !mode);
            }}
            variant="contained"
            className="z-20"
          >
            Toggle daily session mode
          </Button>
        </motion.button>
      </div>
    </div>
  );
};

export default PlayerPage;
