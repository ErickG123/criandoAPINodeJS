// Importando o 'fs' para ajudar na manipulação do arquivo 'users.json'
const fs = require('fs');
// Importando a funcionalidade 'join' do 'path' para tratar caminhos de diretórios
const { join } = require('path');

// Criando o arquivo json resposável por armazenar os usuários
// Criando o caminho do arquivo
const filePath = join(__dirname, 'users.json');

// Criando um método para buscar os usuários no arquivo
const getUsers = () => {
    const data = fs.existsSync(filePath) // Buscando os dados e verificando se ele existe
        ? fs.readFileSync(filePath) // Se ele existir eu vou ler o arquivo
        : []; // Se não existir retorna um objeto vazio
    
    try { // Tratando qualquer erro
        return JSON.parse(data); // Se não houver erro
    } catch (error) {
        return []; // Se houver erro
    }
}

// Criando um método para salvar/ler os usuários
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));

// Criando a rota '/users'
const userRoute = (app) => {
    app.route('/users/:id?') // Definindo a rota | O 'id' é opcional
        .get((req, res) => { // Método que obtém todos os users
            const users = getUsers(); // Chama a função getUsers()       
            
            res.send({ users }); // Envia os users como resposta
        })
        .post((req, res) => { // Método que cria os users
            const users = getUsers(); // Chama a função getUsers()
           
            users.push(req.body); // Adicionando o novo user no objeto
            saveUser(users); // Salva no arquivo json
            
            res.status(201).send('OK'); // Informa que o objeto foi criado
        })
        .put((req, res) => { // Método que atualiza os users
            const users = getUsers() // Chama a função getUsers()

            saveUser(users.map(user => { 
                if (user.id === req.params.id) { // Verificando o id do usuário que será atualizado
                    return { // Retornando os novos dados 
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))

            res.status(200).send('OK') // Informa que o objeto foi atualizado
        })
        .delete((req, res) => {
            const users = getUsers() // Chama a função getUsers()
            
            saveUser(users.filter(user => user.id !== req.params.id)) // Filtrando o id do usuário que será deletado

            res.status(200).send('OK') // Informa que o objeto foi deletado
        })
}

module.exports = userRoute;