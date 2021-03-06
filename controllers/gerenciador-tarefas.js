const { v4: uuidv4 } = require("uuid");

let tarefas = [
    { id: "1", nome: "Aprender React", concluido: true },
    { id: "2", nome: "Aprender JS", concluido: false },
    { id: "3", nome: "Estudar inglês", concluido: false },
    { id: "4", nome: "Estudar Node", concluido: true },
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
    if (
        !req.body["nome"] ||
        !(req.body["concluido"] != null && typeof req.body["concluido"] === "boolean")
    ) {
        res.status(400).json({ erro: "Requisição inválida" });
    } else {
        const tarefa = {
            id: uuidv4(),
            nome: req.body["nome"],
            concluido: req.body["concluido"],
        };
        tarefas.push(tarefa);
        res.json(tarefa);
    }
}

function atualizarTarefa(req, res) {
    if (
        !req.body["nome"] ||
        !(req.body["concluido"] != null && typeof req.body["concluido"] === "boolean")
    ) {
        res.status(400).json({ erro: "Requisição inválida" });
    }
    const id = req.params.id;
    let tarefaAtualizada = false;
    tarefas = tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            tarefa.nome = req.body["nome"];
            tarefa.concluida = req.body["concluido"];
            tarefaAtualizada = true;
        }
        return tarefa;
    });
    if (!tarefaAtualizada) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json({
        id: id,
        nome: req.body["nome"],
        concluido: req.body["concluido"],
    });
}

function removerTarefa(req, res) {
    const id = req.params.id;
    const numTarefas = tarefas.length;
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    if (numTarefas === tarefas.length) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json({ msg: "Tarefa removida com sucesso" });
}

function concluirTarefa(req, res) {
    const id = req.params.id;
    let tarefaConcluida = false;
    tarefas = tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            tarefa.concluido = true;
            tarefaConcluida = true;
        }
        return tarefa;
    });
    if (!tarefaConcluida) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json({ msg: "Tarefa concluída com sucesso" });
}

module.exports = {
    listarTarefaId,
    listarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa,
};
