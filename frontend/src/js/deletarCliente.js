const form = document.forms.formDelete;

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const { idCliente } = form;
  const json = { idCliente: idCliente.value };

  fetch(`http://localhost:8082/clientes/${idCliente.value}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar cliente');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      idCliente.value = "";
      idCliente.focus();
      document.getElementById('resp').innerHTML = 'Cliente deletado com sucesso!';
    })
    .catch(error => {
      console.log(error);
      document.getElementById('resp').innerHTML = error.message;
    });
});
