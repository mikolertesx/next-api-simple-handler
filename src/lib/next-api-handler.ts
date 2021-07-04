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

  const missingBodyKeys: string[] = [];
  for (let key in config.requiredBody) {
    if (!req.body.hasOwnProperty(key)) {
      missingBodyKeys.push(key);
    }
  }

  if (missingBodyKeys.length !== 0) {
    res.status(500).json({
      error: `Missing required body keys: ${missingBodyKeys.join(", ")}`,
    });
  }

  await handler(req, res);
  return;
};
