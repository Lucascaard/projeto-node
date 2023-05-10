const formUpdateCliente = document.getElementById("formUpdateCliente");
formUpdateCliente.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const idCliente = formUpdateCliente.querySelector('input[name="idCliente"]').value;
  
    if (!idCliente) {
      document.getElementById("resp").textContent = "Insira o ID para continuar...";
      idCliente.focus();
      return;
    }
  
    fetch(`http://localhost:8082/consultar-clientes/${idCliente}`)
      .then((response) => response.json())
      .then((cliente) => {
        console.log(cliente);
        //Verificando se cliente existe
        if (cliente.length === 0) {
          document.getElementById("resp").textContent = "Cliente não encontrado.";
          return;
        }
        //const data = document.getElementById("formUpdate");
        const idCliente = document.querySelector('input[name="idCliente"]');
        const cpf = document.querySelector('input[name="cpf"]');
        const nome = document.querySelector('input[name="nome"]');
              
        idCliente.value = cliente.idCliente;
        cpf.value = cliente.cpf;
        nome.value = cliente.nome;
        
      })
      .catch((error) => console.log(error));
  });
  
  const salvar = document.getElementById("salvar");
  const formUpdate = document.getElementById("data");

  formUpdate.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementByName("nome");
    const cpf = document.getElementByName("cpf");
    const idCliente = document.getElementByName("idCliente").value;

  if (!idCliente || !cpf.value || !nome.value) {
    if(!idCliente.value){
      document.getElementById('resp').innerHTML = "Insira o ID do cliente";
      idCliente.focus();
      return;
      } else if(!cpf.value){
        document.getElementById('resp').innerHTML = "Insira o CPF!";
        cpf.focus();
        return;
        } else{
          document.getElementById("resp").innerHTML = "Insira o nome!";
          nome.focus();
          return;
          }
  } 
  
  const formDataUpdate = new FormData(formUpdate); // obtém os dados do formulário

  const json = JSON.stringify(Object.fromEntries(formDataUpdate)); // transforma os dados do formulário em um objeto JSON

  fetch(`http://localhost:8082/clientes/${idCliente}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json // envia o objeto JSON para o servidor
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // imprime a resposta do servidor no console do navegador
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    document.querySelector('input[name="idCliente"]').focus();  
    document.getElementById('resp').innerHTML = 'Cliente alterado com sucesso!';

  })
  .catch(error => {
    console.error(error); // imprime o erro no console do navegador
    document.getElementById('resp').innerHTML = 'Erro ao alterar cliente';
  });
});



