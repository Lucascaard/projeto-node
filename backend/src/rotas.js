const express = require("express");
const rotas = express.Router();

const ClienteController = require("./controllers/clienteController");
const VendaController = require("./controllers/vendaController");
const ResumoController = require("./controllers/resumoController");

//ROTAS DO CLIENTE
rotas.get("/", (req, res) => { res.send("Raiz Online"); });

//CLIENTE
rotas.post("/clientes", ClienteController.create.bind(ClienteController));
rotas.get("/clientes", ClienteController.read.bind(ClienteController));
rotas.post("/clientes/:idCliente", ClienteController.update.bind(ClienteController));
rotas.get("/consultar-clientes/:idCliente", ClienteController.readOne.bind(ClienteController));
//rotas.delete("/clientes/:id", ClienteController.delete.bind(ClienteController));

//VENDAS
rotas.post("/vendas", VendaController.create.bind(VendaController));

//RESUMO
rotas.get("/resumo", ResumoController.join.bind(ResumoController));

module.exports = rotas;