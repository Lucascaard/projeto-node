//!Cadastro de Clientes
const formCadastro = document.getElementById('formCliente');
const cadastrar = document.getElementById("cadastrar");

cadastrar.addEventListener('click', (event) => {
  event.preventDefault(); // evita o comportamento padrão do formulário

    //Tratando os dados
  const idCliente = formCadastro.querySelector('input[name="idCliente"]');
  const cpf = formCadastro.querySelector('input[name="cpf"]');
  const nome = formCadastro.querySelector('input[name="nome"]');

  if (!idCliente.value || !cpf.value || !nome.value) {
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

  const formDataCadastro = new FormData(formCadastro); // obtém os dados do formulário

  const json = JSON.stringify(Object.fromEntries(formDataCadastro)); // transforma os dados do formulário em um objeto JSON

  fetch('http://localhost:8082/clientes', {
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
    document.getElementById('resp').innerHTML = 'Cliente cadastrado com sucesso!';

  })
  .catch(error => {
    console.error(error); // imprime o erro no console do navegador
    document.getElementById('resp').innerHTML = 'Erro ao cadastrar cliente';
  });
});

