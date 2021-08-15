//Sempre iniciar o servidor com comando no terminal --> node index.js
const express = require("express");
const cors = require("cors");

const { listarTarefaId, listarTarefas } = require("./controllers/gerenciador-tarefas");

const app = express(); //criado servidor
const port = 3001; //definido porta de atuacao do servidor

app.use(cors()); //adicionado filtro cors
app.use(express.json()); //dito qual tipo de arquivo que sera trabalhado (API RestFul usa json)

function naoImplementado(req, res) {
    res.status(501).json({ erro: "Não implementado" });
}

//Mapa de rotas
//listar todas as tarefas - get
app.get("/gerenciador-tarefas", listarTarefas);
//listar uma tarefa por id - get
app.get("/gerenciador-tarefas/:id", listarTarefaId);
//cadastrar uma tarefa - post
app.post("/gerenciador-tarefas", naoImplementado);
//atualizar uma tarefa - put
app.put("/gerenciador-tarefas/:id", naoImplementado);
//remover uma tarefa - delete
app.delete("/gerenciador-tarefas/:id", naoImplementado);
// concluir uma tarefa - put
app.put("/gerenciador-tarefas/:id/concluir", naoImplementado);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
