const mongoose = require("mongoose");

const resumoModelSchema = new mongoose.Schema({
  idCliente: Number,
  cpf: Number,
  nome: String,
  vendas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendas",
    },
  ],
});

module.exports = resumoModel = mongoose.model("Resumo", resumoModelSchema);
