// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../../utils/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { comment, userId, action, _key } = req.body;
    const { id }: any = req.query;
    const data = action
      ? await client
          .patch(id)
          .setIfMissing({ comments: [] })
          .insert("after", "comments[-1]", [
            {
              comment,
              _key: uuid(),
              postedBy: { _type: "postedBy", _ref: userId },
            },
          ])
          .commit()
      : await client
          .patch(id)
          .unset([`comments[_key=="${_key}"]`])
          .commit();

    res.status(200).json(data);
  }
}
