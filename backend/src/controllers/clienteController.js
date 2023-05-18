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

  async readOne(req, res) {
    const { idCliente } = req.params;
    const cliente = await Cliente.findOne({idCliente: idCliente});
    return res.json(cliente);
  },

  async update(req, res) {
    const { idCliente } = req.params;
    const { cpf, nome } = req.body;
  
    try {
      const cliente = await Cliente.findOneAndUpdate(
        { idCliente },
        { cpf, nome },
        { new: true } // para retornar o documento atualizado
      );
      if (!cliente) {
        return res.status(404).json({ msg: "Cliente não encontrado" });
      }
  
      return res.status(200).json(cliente);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro no servidor");
    }
  },
  
  async delete(req, res) {
    const { idCliente } = req.params;
  
    try {
      const cliente = await Cliente.findOneAndDelete({ idCliente });
      if (!cliente) {
        return res.status(404).json({ msg: "Cliente não encontrado" });
      }
  
      const msg = { msg: "Cliente deletado com sucesso!" };
      return res.status(200).json({ msg, cliente });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro no servidor");
    }
  },
  
  }