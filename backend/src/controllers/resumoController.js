// Importa o modelo de Cliente
const Cliente = require("../models/clienteModel");

module.exports = {
  // Define um método chamado 'join' que é assíncrono
  async join(req, res) {
    try {
      // Cria uma pipeline de agregação, uma lista de etapas que serão aplicadas em uma coleção
      const pipeline = [
        // Faz um lookup na coleção 'vendas' utilizando o campo 'idCliente' da coleção 'clientes'
        {
          $lookup: {
            from: "vendas",
            localField: "idCliente",
            foreignField: "idClienteVenda",
            as: "vendas",
          },
        },
        // Agrupa os resultados do lookup por '_id' (que é o campo único de cada documento)
        // e projeta os campos 'cpf' e 'nome' como primeiro elemento de cada grupo
        // e projeta o campo 'vendas' como uma lista contendo as vendas de cada grupo
        {
          $group: {
            _id: "$_id",
            idCliente: { $first: "$idCliente"},
            cpf: { $first: "$cpf" },
            nome: { $first: "$nome" },
            vendas: { $push: "$vendas" },
          },
        },
      ];

      // Executa a pipeline de agregação na coleção de clientes e armazena o resultado em 'result'
      const result = await Cliente.aggregate(pipeline);

      // Retorna o resultado como uma resposta JSON
      res.json(result);
    } catch (error) {
      // Se houver algum erro, imprime no console e retorna um erro 500 como resposta JSON
      console.error(error);
      res.status(500).json({ error: "Erro ao realizar o join" });
    }
  },
};
