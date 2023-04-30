const express = require("express");
const rotas = express.Router();

const ClienteController = require("./controllers/clienteController");
const VendaController = require("./controllers/vendaController");
const ResumoController = require("./controllers/resumoController");

//ROTAS DO CLIENTE
rotas.get("/", (req, res) => { res.send("Raiz Online"); });
rotas.post("/clientes", ClienteController.create.bind(ClienteController));
rotas.post("/vendas", VendaController.create.bind(VendaController));
rotas.get("/resumo", ResumoController.resumo.bind(ResumoController));

module.exports = rotas;