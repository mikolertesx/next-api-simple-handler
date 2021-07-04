import apiConfiguration from "./next-api-configuration";
import { apiHandler } from "./next-api-handler";
import type { NextApiRequest, NextApiResponse } from "next";

export const apiRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
  config: apiConfiguration,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  return async (req, res) =>
    await apiHandler(
      req,
      res,
      config,
      handler,
    );
  return;
};
