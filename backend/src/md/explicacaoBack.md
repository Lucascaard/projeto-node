## Body Parser

O body-parser é um *middleware* de processamento de middleware de nó que analisa o corpo de uma solicitação e extrai os dados da solicitação em um formato mais conveniente e utilizável. O corpo da solicitação pode estar em vários formatos, como JSON, URL codificado, codificado multipart, etc., e o body-parser permite que você analise o corpo da solicitação independentemente do formato em que ele é recebido.

Com o body-parser, você pode usar métodos de análise específicos para diferentes formatos de dados de solicitação, como o método json() para analisar o corpo da solicitação como JSON, ou o método urlencoded() para analisar dados de formulário codificados em URL. Esses métodos são usados como middlewares e são incorporados a um pipeline de middlewares na sua aplicação Node.js.

O body-parser é uma biblioteca popular e é frequentemente usado em conjunto com o Express.js para analisar o corpo de solicitações HTTP em aplicativos da web.

``` javaScript
app.use(bodyParser.urlencoded({ extended: false }));
```
Essa linha de código indica que a aplicação Express deve usar o middleware body-parser para analisar os dados enviados no corpo das solicitações com o formato urlencoded, que é o formato padrão de dados enviado em formulários HTML.

O objeto passado para o método urlencoded() é uma opção que indica que o extended deve ser false, o que significa que os objetos codificados na URL serão uma sequência ou um array, em vez de objetos aninhados. Se extended fosse definido como true, seria permitido objetos aninhados na codificação urlencoded.

Em resumo, essa linha de código configura o body-parser para analisar e decodificar dados em formato urlencoded no corpo das solicitações HTTP.

## Middleware

Middleware é um termo usado em desenvolvimento de software para se referir a uma camada de software que atua entre diferentes sistemas ou componentes de um sistema, facilitando a comunicação entre eles.

Em uma aplicação web, por exemplo, o middleware é uma camada de software que fica entre o cliente (como um navegador) e o servidor, processando as requisições e respostas e fornecendo funcionalidades extras, como autenticação, validação de dados, logging, entre outros.

No desenvolvimento de aplicações web em Node.js, é comum usar middlewares para realizar diversas tarefas, como análise de corpo de requisição, manipulação de cabeçalhos, compressão de resposta, autenticação, validação, entre outros. O Express.js, um popular framework para Node.js, oferece uma grande variedade de middlewares prontos para uso, além de permitir que os desenvolvedores criem seus próprios middlewares personalizados.

## CORS

O CORS (Cross-Origin Resource Sharing) é uma medida de segurança implementada pelos navegadores para proteger os usuários de ataques de cross-site scripting (XSS) e cross-site request forgery (CSRF). O objetivo do CORS é permitir que os desenvolvedores possam controlar quais recursos do servidor podem ser acessados por outros domínios.

Quando você faz uma requisição para um servidor de um domínio diferente do seu, o navegador adiciona um cabeçalho de segurança (Origin) à requisição. O servidor então pode enviar uma resposta com um cabeçalho Access-Control-Allow-Origin para permitir ou negar o acesso ao recurso.

### Cors Policy

> Erro: cess to fetch at 'http://localhost:8082/cliente' from origin 'http://127.0.0.1:5501' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Esse erro ocorre devido a uma política de segurança no navegador chamada Same-Origin Policy, que impede que um script em uma origem (domínio, protocolo e porta) acesse recursos de outra origem. O navegador está bloqueando a solicitação enviada pelo script em http://127.0.0.1:5501 para o servidor em http://localhost:8082/cliente, porque eles têm origens diferentes. Como solução, pode ser usado o pacote CORS do Node.js `npm install cors` para configurar o servidor para permitir solicitações de outros domínios, adicionando os cabeçalhos de acesso necessário à resposta do servidor.

Exemplo
```javaScript //Node.js

    const cors = require('cors');
    app.use(cors({ origin: 'http://127.0.0.1:5501' }));

```
### Frontend

Já no caso do front foi necessário criar uma função para enviar o formulário pro backend

```javaScript
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
    
  fetch('http://localhost:8082/clientes', { //endereço absoluto da requisição
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json // envia o objeto JSON para o servidor
  })
  .then(response => response.json()) // recebe a resposta da requisição e transforma em um json
  .then(data => { // data recebe responde.json() ja formatado
    console.log(data); // imprime a resposta do servidor no console do navegador
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    document.querySelector('input[name="idCliente"]').focus();  
    document.getElementById('resp').innerHTML = 'Cliente cadastrado com sucesso!';

  })
  //error recebe o possível erro da requisição e trata
  .catch(error => {
    console.error(error); // imprime o erro no console do navegador
    document.getElementById('resp').innerHTML = 'Erro ao cadastrar cliente';
  });
});



```

## Bind

Estou utilizando o `bind` no `rotas.js` para fixar o valor do this dentro da função `create` do `VendaController`. O método `create` utiliza o this para acessar o `Venda model` e criar um novo registro de venda no banco de dados. Quando utilizo a função `create` diretamente no `post` da rota, o this não é mais referente ao seu controller, o que pode gerar erros no momento de acessar o model Venda. Portanto, é necessário utilizar o `bind` para fixar o valor do this como sendo o seu `VendaController`, garantindo que a função create possa acessar o Venda model corretamente.