const Resumo = require("../models/clienteModel");

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

    module.exports =  {
      async resumo() {
        try{
          const resumoJoin = await Resumo.aggregate(pipeline);
          return resumoJoin;
        } catch (error) {
          console.log(`Erro ao consultar resumo ${error}`);
        }
      }
    };