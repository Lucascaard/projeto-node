//!Vendas

const formVendas = document.getElementById("FormVendas");
const vender = document.getElementById("vender");

vender.addEventListener("click", (event) => {
  event.preventDefault();

  const produto = formVendas.querySelector('input[name="produto"]');
  const idClienteVenda = formVendas.querySelector(
    'input[name="idClienteVenda"]'
  );
  const data = formVendas.querySelector('input[name="data"]');

  if (!produto.value || !idClienteVenda.value || !data.value) {
    if (!produto.value) {
      document.getElementById("resp").innerHTML = "Insira o nome do produto!";
      produto.focus();
      return;
    } else if (!idClienteVenda.value) {
      document.getElementById("resp").innerHTML = "Insira o ID do cliente!";
      idClienteVenda.focus();
      return;
    } else {
      document.getElementById("resp").innerHTML = "Insira a data!";
      data.focus();
      return;
    }
  }

  const formData = new FormData(formVendas);

  const json = JSON.stringify(Object.fromEntries(formData));

  fetch("http://localhost:8082/vendas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  })
    // recebe a resposta da Promise e converte para JSON
    .then((response) => response.json())

    // esse parâmetro recebe o "response.json()" e pode ser usado pra manipula a resposta da Promise
    .then((data) => {
      console.log(data); //mandando a resposta pro console
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => (input.value = "")); // Limpando todos os inputs com ForEach
      document.querySelector('input[name="produto"]').focus();

      document.getElementById("resp").innerHTML =
        "Venda realizada com sucesso!";
    })
    // parâmetro que vai dentro do bloco catch vai receber o erro da Promise
    .catch((error) => {
      console.error(error);
      document.getElementById("resp").innerHTML =
        "Erro ao realizar venda. Consulte o erro no Console";
    });
});
