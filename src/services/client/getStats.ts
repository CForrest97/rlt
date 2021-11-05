/* eslint-disable no-undef */
import { Stats } from "../server/getStats";

export const getStats = async (username: string): Promise<Stats> =>
  fetch(`${window.location}api/stats/${username}`).then((r) => r.json());
