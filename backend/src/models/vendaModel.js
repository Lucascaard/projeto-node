const mongoose = require("mongoose");

const VendaModelSchema = new mongoose.Schema({
    produto: String,
    idClienteVenda: Number,
    data: Date
});

module.exports = mongoose.model("vendas", VendaModelSchema);