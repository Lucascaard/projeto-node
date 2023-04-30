const Cliente = require("../models/clienteModel");

module.exports = {
  async create(req, res) {
    const { idCliente, cpf, nome } = req.body;
    if(!idCliente || !cpf || !nome) {
      return res.status(400).json({error: "Preencha todos os campos!"});
    }
    try {
      const clienteCriado = await Cliente.create({
        idCliente,
        cpf,
        nome
      });

      return res.json(clienteCriado);

    } catch (err) {
      console.error(err);
      return res.status(500).json({error: "Erro ao criar cliente"});
    }
  },

  async read(req, res) {
    const clienteList = await Cliente.find();
    return res.json(clienteList);

  },
}
