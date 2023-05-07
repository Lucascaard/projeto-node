const mongoose = require("mongoose");

const clienteModelSchema = new mongoose.Schema({
    idCliente: Number,
    cpf:Number,
    nome: String,
    vendas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "vendas",
        },
      ],
});

module.exports = mongoose.model("clientes", clienteModelSchema);