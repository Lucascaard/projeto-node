## Exemplo do `update` e `delete` do PessoaController

```javaScript / Node
// Função para atualizar os dados de uma pessoa (Update)
    async update(req, res) {
        const { id } = req.params; // Obtém o ID da pessoa a ser atualizada a partir dos parâmetros da requisição
        const { cpf, nome, idade, salario } = req.body; // Obtém os novos dados da pessoa a partir do corpo da requisição
        const pessoa = await Pessoa.findOne({ _id: id }); // Busca a pessoa a ser atualizada no banco de dados utilizando o ID
        pessoa.cpf = cpf; // Atualiza os campos da pessoa com os novos dados
        pessoa.nome = nome;
        pessoa.idade = idade;
        pessoa.salario = salario;
        await pessoa.save(); // Salva as mudanças no banco de dados
        return res.json(pessoa); // Retorna a pessoa atualizada como resposta em formato JSON
    },

    // Função para deletar uma pessoa (Delete)
    async delete(req, res) {
        const { id } = req.params; // Obtém o ID da pessoa a ser deletada a partir dos parâmetros da requisição
        const pessoaDeletada = await Pessoa.findOneAndDelete({ _id: id }); // Busca e deleta a pessoa no banco de dados utilizando o ID
        if (pessoaDeletada) { // Verifica se a pessoa foi deletada com sucesso
            return res.json(pessoaDeletada); // Retorna a pessoa deletada como resposta em formato JSON
        }
    }

```