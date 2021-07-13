import apiConfiguration from "./interfaces/next-api-configuration";
import { defaultConfig } from "./defaults/defaultConfig";
import { NextRequest } from "./interfaces/next-request";
import { NextResponse } from "./interfaces/next-response";

export const apiHandler = async (
  req: NextRequest,
  res: NextResponse,
  config: apiConfiguration,
  handler: (req: NextRequest, res: NextResponse) => Promise<void>,
) => {
  if (config.contentType) {
    if (config.contentType !== req.headers["content-type"]) {
      res.status(
        config.errorCodes?.["wrong-content-type"] ||
          defaultConfig.errorCodes["wrong-content-type"],
      ).json({
        error: config.errorMessages?.["wrong-content-type"]?.(
          config.contentType,
          req.headers["content-type"],
        ) ||
          defaultConfig.errorMessages["wrong-content-type"](
            config.contentType,
            req.headers["content-type"],
          ),
      });

      return;
    }
  }

  if (config.methods) {
    const isMethodPermitted = config.methods.findIndex((method) =>
      method === req.method
    ) !== -1;

    if (!isMethodPermitted) {
      res.status(
        config.errorCodes?.["wrong-method"] ||
          defaultConfig.errorCodes?.["wrong-method"],
      ).json({
        error: config.errorMessages?.["wrong-method"]?.(config.methods) ||
          defaultConfig.errorMessages?.["wrong-method"](config.methods),
      });
      return;
    }
  }

  if (config.requiredBody) {
    const missingBodyKeys: string[] = [];
    for (const key of config.requiredBody) {
      if (!req.body.hasOwnProperty(key)) {
        missingBodyKeys.push(key);
      }
    }

    if (missingBodyKeys.length !== 0) {
      res.status(
        config.errorCodes?.["missing-body-key"] ||
          defaultConfig.errorCodes?.["missing-body-key"],
      ).json({
        error: config.errorMessages?.["missing-body-key"]?.(missingBodyKeys) ||
          defaultConfig.errorMessages["missing-body-key"](missingBodyKeys),
      });
      return;
    }
  }

  await handler(req, res);
  return;
};
