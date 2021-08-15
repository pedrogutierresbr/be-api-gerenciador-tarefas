const { v4: uuidv4 } = require("uuid");

let tarefas = [
    { id: "1", nome: "Aprender React", concluida: true },
    { id: "2", nome: "Aprender JS", concluida: false },
    { id: "3", nome: "Estudar inglês", concluida: false },
    { id: "4", nome: "Estudar Node", concluida: true },
];

function listarTarefaId(req, res) {
    const id = req.params.id;
    const tarefa = tarefas.filter((tarefa) => tarefa.id === id);
    if (tarefa.length === 0) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json(tarefa[0]);
}

function listarTarefas(req, res) {
    const pagina = req.query["pag"] || 1;
    const ordem = req.query["ordem"]; //ASC, DESC
    const filtroTarefa = req.query["filtro-tarefa"];
    const itensPorPagina = req.query["itens-por-pagina"] || 3;
    let tarefasRetornar = tarefas.slice(0);

    //filtro
    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            (tarefa) =>
                tarefa.nome.toLocaleLowerCase().indexOf(filtroTarefa.toLocaleLowerCase()) === 0
        );
    }
    //ordenar
    if (ordem === "ASC") {
        tarefasRetornar.sort((t1, t2) =>
            t1.nome.toLocaleLowerCase() > t2.nome.toLocaleLowerCase() ? 1 : -1
        );
    } else if (ordem === "DESC") {
        tarefasRetornar.sort((t1, t2) =>
            t1.nome.toLocaleLowerCase() < t2.nome.toLocaleLowerCase() ? 1 : -1
        );
    }
    //retornar
    res.json({
        totalItens: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
        pagina: pagina,
    });
}

function cadastrarTarefa(req, res) {
    if (!req.body["nome"] && !req.body["concluido"]) {
        res.status(400).json({ erro: "Requisição inválida" });
    }
    const tarefa = {
        id: uuidv4(),
        nome: req.body["nome"],
        concluido: req.body["concluido"],
    };
    tarefas.push(tarefa);
    res.json(tarefa);
}

function atualizarTarefa(req, res) {}

function removerTarefa(req, res) {}

function concluirTarefa(req, res) {}

module.exports = {
    listarTarefaId,
    listarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa,
};
