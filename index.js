// 'npm init' para adicionar o arquivo 'package.json'
// Instalar o Express: 'npm install express --save'

// Importando o Express
const express = require('express');

// Importando o BodyParser
// Para transforma os dados da requisição HTTP em um objeto para receber no 'body'
const bodyParser = require('body-parser');

// Criando uma rota para CRUD de Usuários
const userRoute = require('./routes/userRoute');

// Atribuindo o Express a aplicação
const app = express();
// Definindo a porta que a aplicação irá rodas
const port = 3000;
 
// É preciso usar o bodyParser para transformar o post em um objeto
app.use(bodyParser.urlencoded({ extended: false }));

// Importando a função userRoute
// O 'app' é um dependência dessa rota
userRoute(app);

// Definindo a rota do GET
app.get('/', (req, res) => {
    res.send('Olá mundo pelo Express');
});

// Fazendo a aplicação rodar na porta definida e enviar uma mensagem
app.listen(port, () => {
    console.log('Api rodando na porta 3000');
});