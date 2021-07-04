type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface NextApiConfiguration {
  methods: Methods[];
}

export default NextApiConfiguration;
