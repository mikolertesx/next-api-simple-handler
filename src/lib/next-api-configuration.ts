type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ContentType = "application/json" | string;

interface NextApiConfiguration {
  methods?: Methods[];
  requiredBody?: string[];
  contentType?: ContentType;
  schema?: object;
}

export default NextApiConfiguration;
