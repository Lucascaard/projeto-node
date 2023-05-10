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
    const cliente = await Cliente.find({idCliente: idCliente});
    return res.json(cliente);
  },

  

  async update(req, res) {
    const { id } = req.params;
    const { idCliente, cpf, nome} = req.body;

    const updateCliente = await Cliente.findOne({idCliente: id});
      updateCliente.idCliente = idCliente;
      updateCliente.cpf = cpf;
      updateCliente.nome = nome;
      
    await updateCliente.save();
    return res.status(200).json(updateCliente);

  },

 async update( req , res ){
        const { id } = req.params; 
        const { Nome, Marca, Qtde, Validade } = req.body;

        const updateProduto = await Produto.findOne({_id: id});
            updateProduto.Nome = Nome;
            updateProduto.Marca = Marca;
            updateProduto.Qtde = Qtde;
            updateProduto.Validade = Validade;
        await updateProduto.save();

        return res.json(updateProduto);
    },

    async delete( req, res ){
        const { id } = req.params;
        const ProdutoDeletado = await Produto.findByIdAndDelete({_id: id});
        if(ProdutoDeletado){
            const msg = {msg: "Produto deletado com sucesso!"};
            return res.status(200).json({msg, ProdutoDeletado});
        };
    } 
  }