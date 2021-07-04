type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface NextApiConfiguration {
  methods: Methods[];
  requiredBody: string[];
}

export default NextApiConfiguration;
