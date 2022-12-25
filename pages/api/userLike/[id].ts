import type { NextApiRequest, NextApiResponse } from "next";

import { userLikedPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const userLikedVideosQuery = userLikedPostsQuery(id);
    const data = await client.fetch(userLikedVideosQuery);

    res.status(200).json(data);
  }
}
