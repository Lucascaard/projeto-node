document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("section");

  fetch("http://localhost:8082/resumo")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((cliente) => {
        const div = document.createElement("div");
        const nome = document.createElement("h2");
        const cpf = document.createElement("h2");
        const idCliente = document.createElement("h2");

        nome.textContent = `Nome: ${cliente.nome}`;
        cpf.textContent = `CPF: ${cliente.cpf}`;
        idCliente.textContent = `ID: ${cliente.idCliente}`;

        div.appendChild(nome);
        div.appendChild(cpf);
        div.appendChild(idCliente);

        //A instancia venda é um `array` de `arrays` então é necessário dois loops, um para entrar no primeiro array e outro para percorrer os arrays que estão dentro

        cliente.vendas.forEach((venda) => {
          venda.forEach((produto) => {
            const ul = document.createElement("ul");
            const liProduto = document.createElement("li");
            const liData = document.createElement("li");

            liProduto.textContent = `Produto: ${produto.produto}`;
            liData.textContent = `Data: ${produto.data}`;

            ul.appendChild(liProduto);
            ul.appendChild(liData);

            div.appendChild(ul);
          });
        });
        document.createElement("hr");
        div.appendChild(document.createElement("hr"));
        section.appendChild(div);
      });
    })
    .catch((error) => console.log(error));
});
