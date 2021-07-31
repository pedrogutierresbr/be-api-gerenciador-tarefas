//Sempre iniciar o servidor com comando no terminal --> node index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const { listarTarefaId, listarTarefas, cadastrarTarefa } = require("./controllers/gerenciador-tarefas.js");

const app = express();
const port = 3001;

app.use(cors()); //adicionado filtro cors
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json()); //dito qual tipo de arquivo que sera trabalhado (API RestFul usa json)

//get (retorna dados), post (cadastro de dados), put (atualiza/modifica dados), delete (deleta dados)

function naoImplementado(req, res) {
    res.status(501).json({ erro: "Não implementado" });
}

//listar todas as tarefas --> get
app.get("/gerenciador-tarefas", listarTarefas);
//listar uma tarefa por id --> get
app.get("/gerenciador-tarefas/:id", listarTarefaId);
//cadastrar uma tarefa --> post
app.post("/gerenciador-tarefas", cadastrarTarefa);
//atualizar uma tarefa --> put
app.put("/gerenciador-tarefas/:id", naoImplementado);
//remover uma tarefa --> delete
app.delete("/gerenciador-tarefas/:id", naoImplementado);
//concluir uma tarefa --> put
app.put("/gerenciador-tarefas/:id/concluir", naoImplementado);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
