import assert from "assert";
import { NextApiHandler } from "next";
import { getStats } from "../../../services/server/getStats";

const handler: NextApiHandler = async (req, res) => {
  const { username } = req.query;

  assert(typeof username === "string");
  console.log("fetching");

  const stats = await getStats(username);

  res.status(200).json(stats);
};

export default handler;
