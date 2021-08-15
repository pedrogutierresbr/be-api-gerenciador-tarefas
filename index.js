//Sempre iniciar o servidor com comando no terminal --> node index.js
const express = require("express");
const cors = require("cors");

const {
    listarTarefaId,
    listarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa,
} = require("./controllers/gerenciador-tarefas");

const app = express(); //criado servidor
const port = 3001; //definido porta de atuacao do servidor

app.use(cors()); //adicionado filtro cors
app.use(express.json()); //dito qual tipo de arquivo que sera trabalhado (API RestFul usa json)

//Função não mais utilizada, mas a deixei aqui porque serviu na parte inicial do desenvolvimento
function naoImplementado(req, res) {
    res.status(501).json({ erro: "Não implementado" });
}

//Mapa de rotas
//listar todas as tarefas - get
app.get("/gerenciador-tarefas", listarTarefas);
//listar uma tarefa por id - get
app.get("/gerenciador-tarefas/:id", listarTarefaId);
//cadastrar uma tarefa - post
app.post("/gerenciador-tarefas", cadastrarTarefa);
//atualizar uma tarefa - put
app.put("/gerenciador-tarefas/:id", atualizarTarefa);
//remover uma tarefa - delete
app.delete("/gerenciador-tarefas/:id", removerTarefa);
// concluir uma tarefa - put
app.put("/gerenciador-tarefas/:id/concluir", concluirTarefa);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
