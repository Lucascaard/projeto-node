const express = require("express");
const rotas = express.Router();

const ClienteController = require("./controllers/clienteController");
const VendaController = require("./controllers/vendaController");
const ResumoController = require("./controllers/resumoController");

//CLIENTE
rotas.post("/clientes", ClienteController.create.bind(ClienteController)); // OK
rotas.get("/clientes", ClienteController.read.bind(ClienteController)); // OK
rotas.post("/clientes/:idCliente", ClienteController.update.bind(ClienteController)); // OK
rotas.get("/consultar-clientes/:idCliente", ClienteController.readOne.bind(ClienteController)); // OK
rotas.delete("/clientes/:idCliente", ClienteController.delete.bind(ClienteController)); // OK

//VENDAS
rotas.post("/vendas", VendaController.create.bind(VendaController)); // OK

//RESUMO
rotas.get("/resumo", ResumoController.join.bind(ResumoController)); //OK

module.exports = rotas;