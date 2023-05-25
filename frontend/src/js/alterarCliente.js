const formsUm = document.forms.formsUm;
formsUm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const { idCliente } = formsUm;

  if (!idCliente.value) {
    document.getElementById("resp").textContent =
      "Insira o ID para continuar...";
    idCliente.focus();
    return;
  }

  fetch(`http://localhost:8082/consultar-clientes/${idCliente.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Erro na requisição. Verifique o URL ou a resposta do servidor."
        );
      }
      return response.json();
    })
    .then((cliente) => {
      // Verificando se cliente existe
      if (!cliente || cliente.length === 0) {
        document.getElementById("resp").textContent = "Cliente não encontrado.";
        return;
      }
      const formsData = document.forms.data;

      formsData.idCliente.value = cliente.idCliente;
      formsData.cpf.value = cliente.cpf;
      formsData.nome.value = cliente.nome;
    })
    .catch((error) => console.log(error));
});

const salvar = document.getElementById("salvar");
const formUpdate = document.forms.data;

formUpdate.addEventListener("submit", (event) => {
  event.preventDefault();

  const { idCliente, cpf, nome } = formUpdate;

  if (!idCliente.value || !cpf.value || !nome.value) {
    if (!idCliente.value) {
      document.getElementById("resp").innerHTML = "Insira o ID do cliente";
      idCliente.focus();
      return;
    } else if (!cpf.value) {
      document.getElementById("resp").innerHTML = "Insira o CPF!";
      cpf.focus();
      return;
    } else {
      document.getElementById("resp").innerHTML = "Insira o nome!";
      nome.focus();
      return;
    }
  }

  const formDataUpdate = new FormData(formUpdate); // obtém os dados do formulário

  const json = JSON.stringify(Object.fromEntries(formDataUpdate)); // transforma os dados do formulário em um objeto JSON

  fetch(`http://localhost:8082/clientes/${idCliente.value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json, // envia o objeto JSON para o servidor
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // imprime a resposta do servidor no console do navegador
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
      document.querySelector('input[name="idCliente"]').focus();
      let resp = document.getElementById("resp");
      resp.innerHTML = "Cliente alterado com sucesso!";
      setTimeout(() => {
        resp.style.display = "none";
      }, 5000); // colocando tempo de visualização de 5000 milissegundos (5 segundos)
    })
    .catch((error) => {
      console.error(error); // imprime o erro no console do navegador
      document.getElementById("resp").innerHTML = "Erro ao alterar cliente";
    });
});
