import apiConfiguration from "./next-api-configuration";
import { NextRequest } from "./interfaces/next-request";
import { NextResponse } from "./interfaces/next-response";
import { apiHandler } from "./next-api-handler";

export const apiRoute = async (
  config: apiConfiguration,
  handler: (req: NextRequest, res: NextResponse) => Promise<void>,
) => {
  return async (req, res) =>
    await apiHandler(
      req,
      res,
      config,
      handler,
    );
};
