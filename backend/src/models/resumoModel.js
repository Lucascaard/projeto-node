const mongoose = require("mongoose");

const resumoModelSchema = new mongoose.Schema({
  idCliente: Number,
  cpf: Number,
  nome: String,
  vendas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendas",
    },
  ],
});

module.exports = resumoModel = mongoose.model("clientes", resumoModelSchema);
