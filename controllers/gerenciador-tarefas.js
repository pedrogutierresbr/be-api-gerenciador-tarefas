//Sempre iniciar o servidor com comando no terminal --> node index.js

const uuidv4 = require("uuid/v4");

let tarefas = [
    { id: "1", nome: "Aprender React JS", concluida: true },
    { id: "2", nome: "Estudar JavaScript", concluida: false },
    { id: "3", nome: "Fazer projeto de inglês", concluida: false },
    { id: "4", nome: "Aprender sobre testes de software", concluida: false },
];

function listarTarefaId(req, res) {
    const id = req.params.id;
    const tarefa = tarefas.filter((tarefa) => tarefa.id === id);
    if (tarefa.length === 0) {
        res.status(404).json({ erros: "Tarefa não encontrada" });
    }
    res.json(tarefa[0]);
}

function listarTarefas(req, res) {
    //acessando parametros passados pelas url
    const pagina = req.query["pag"] || 1;
    const ordem = req.query["ordem"]; //ASC, DESC
    const filtroTarefa = req.query["filtro-tarefa"];
    const itensPorPagina = req.query["itens-por-pagina"] || 3;
    //duplicar lista tarefas
    let tarefasRetornar = tarefas.slice(0);
    //filtro
    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            (tarefa) => tarefa.nome.toLocaleLowerCase().indexOf(filtroTarefa.toLocaleLowerCase()) === 0
        );
    }
    //ordenar dados
    if (ordem === "ASC") {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLocaleLowerCase() > t2.nome.toLocaleLowerCase() ? 1 : -1));
    } else if (ordem === "DESC") {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLocaleLowerCase() < t2.nome.toLocaleLowerCase() ? 1 : -1));
    }
    //tratando um erro
    if (tarefasRetornar.length === 0) {
        res.status(404).json({ erro: "Não foi possível encontrar tarefas" });
    }
    //retornar dados
    res.json({
        totalItens: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
        pagina: pagina,
    });
}

module.exports = { listarTarefaId, listarTarefas };
