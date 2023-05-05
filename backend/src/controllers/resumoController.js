const Cliente = require("../models/clienteModel");

module.exports = {
  async join(req, res) {
    const pipeline = [
      {
        $lookup: {
          from: "vendas",
          localField: "idCliente",
          foreignField: "idClienteVenda",
          as: "vendas",
        },
      },
    ];

    Cliente.aggregate(pipeline).exec((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
        res.status(200).json(result); // resultado do join
      });

    }
    
  }

    // Pesquisar sobre populate, relacionamentos de dados mongodb + node