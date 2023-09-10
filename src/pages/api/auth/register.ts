import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

import connection from "@/db/connection";
import User from "@/models/UserSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connection().catch((error) => {
    return res.json({
      error: "Connection Failed!",
    });
  });

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(400).json({ message: "Dont have form data!" });
    }

    const { username, email, password } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(422).json({ message: "Email already exist!" });
    }

    User.create({ username, email, password: await hash(password, 12) })
      .then((result) => {
        res.status(201).json({ status: true, user: result });
      })
      .catch((error) => {
        if (error) return res.status(404).json({ error });
      });
  } else {
    res
      .status(405)
      .json({ message: "Method not allowed, only POST accepted!" });
  }
}
