import type { NextApiRequest, NextApiResponse } from "next";
type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface NextApiConfiguration {
  methods?: Methods[];
  requiredBody?: string[];
	contentType?: string;
}

export default NextApiConfiguration;
