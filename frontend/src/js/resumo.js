document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8082/resumo",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }) 
      .then((response) => response.json())
      .then(data => {
        console.log(data);
        console.log("Resposta da API:", response);
        console.log("Dados obtidos:", data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  