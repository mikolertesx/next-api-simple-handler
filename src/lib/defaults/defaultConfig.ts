import apiConfiguration from "../interfaces/next-api-configuration";

export const defaultConfig: apiConfiguration = {
  errorCodes: {
    "missing-body-key": 422,
    "wrong-content-type": 422,
    "wrong-method": 422,
  },
  errorMessages: {
    "wrong-content-type": (expectedContentType, receivedContentType) =>
      `Expected '${expectedContentType}' content-type, not '${receivedContentType}' content-type`,
    "missing-body-key": (missingBodyKeys: string[]) =>
      `Missing required body keys: ${missingBodyKeys.join(", ")}`,
    "wrong-method": (allowedMethods: string[]) =>
      `Only methods ${allowedMethods.join(", ")} are permitted on this route.`,
  },
};
