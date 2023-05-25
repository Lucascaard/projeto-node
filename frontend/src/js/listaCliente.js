document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("section");
  
    fetch("http://localhost:8082/clientes")
    .then(response => response.json())
    .then(data => {
      data.forEach(cliente => {
  
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
  
        document.createElement("hr");
        div.appendChild(document.createElement("hr"));
        section.appendChild(div);
      });
    })
    .catch(error => console.log(error));
  });
  
  
  
  
  