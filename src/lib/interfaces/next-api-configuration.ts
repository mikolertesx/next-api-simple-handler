import { Methods } from "../types/MethodType";
import { ContentType } from "../types/ContentType";

type failTypes = "wrong-content-type" | "wrong-method" | "missing-body-key";
type errorMessageFunctions = {
  "wrong-content-type"?: (
    expectedContentType: string,
    receivedContentType: string,
  ) => string;
  "wrong-method"?: (
    allowedMethods: Methods[],
  ) => string;
  "missing-body-key"?: (missingBodyKeys: string[]) => string;
};

type errorCodeMaps = { [failType in failTypes]?: number };
// type errorMessageMaps = { [failType in failTypes]: (...args: any) => string };
export interface NextApiConfiguration {
  methods?: Methods[];
  requiredBody?: string[];
  contentType?: ContentType;
  errorCodes?: errorCodeMaps;
  errorMessages?: errorMessageFunctions;
  schema?: object;
}

export default NextApiConfiguration;
