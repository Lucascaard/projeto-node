const Venda = require("../models/vendaModel");

module.exports = {
    async create( req, res) {
        const { produto, idClienteVenda, data } = req.body;
        if(!produto || !idClienteVenda || !data) {
            return res.status(400).json({error: "Preencha todos os campos!"});
        }
        try{
            const vendaRealizada = await Venda.create({
                produto,
                idClienteVenda,
                data
            });
            return res.status(200).json({
                mensagem: "Venda realizada com sucesso",
                venda: vendaRealizada
            });
        } catch(error){  
            console.error(error);
            res.status(500).json({error: "Erro ao realizar venda!"});
        } 
    },

    async read ( req, res) {
        const vendasList = Venda.find();
        res.status(200).json({
            mensagem: "Resumo das vendas",
            resumo: vendasList
        });
    }
};