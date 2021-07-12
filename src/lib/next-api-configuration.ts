import { Methods } from "./types/MethodType";
type ContentType = "application/json" | string;

interface NextApiConfiguration {
  methods?: Methods[];
  requiredBody?: string[];
  contentType?: ContentType;
  schema?: object;
}

export default NextApiConfiguration;
