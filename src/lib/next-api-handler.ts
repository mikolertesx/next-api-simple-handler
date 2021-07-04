import apiConfiguration from "./next-api-configuration";
import type { NextApiRequest, NextApiResponse } from "next";

export const apiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  config: apiConfiguration,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  const isMethodPermitted =
    config.methods.findIndex((method) => method === req.method) !== -1;

  if (!isMethodPermitted) {
    res.status(500).json({
      error: `Only methods ${
        config.methods.join(", ")
      } are permitted on this route.`,
    });
    return;
  }

  await handler(req, res);
  return;
};
