//Sempre iniciar o servidor com comando no terminal --> node index.js

const { json } = require("body-parser");
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

function cadastrarTarefa(req, res) {
    //primeira validacao que se for vdd retorna erro
    if (!req.body["nome"] && !req.body["concluida"]) {
        res.status(400).json({ erro: "Requisição inválida" });
    }
    //referenciado infos de acordo com o que vem da URL
    const tarefa = {
        id: uuidv4(),
        nome: req.body["nome"],
        concluida: req.body["concluida"],
    };
    //adicionado no array tarefas (nossa simulação de BD)
    tarefas.push(tarefa);
    //comando de resposta da requisição
    res.json(tarefa);
}

function atualizarTarefa(req, res) {
    //validação
    if (!req.body["nome"] && !req.body["concluida"]) {
        res.status(400).json({ erro: "Requisição inválida" });
    }
    // obter id da URL
    const id = req.params.id;
    let tarefaAtualizada = false; // se nao for atualizada para true, nao encontrou a tarefa
    tarefas = tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            tarefa.nome = req.body["nome"];
            tarefa.concluida = req.body["concluida"];
            tarefaAtualizada = true;
        }
        return tarefa;
    });
    //repsosta da requicao cado erro
    if (!tarefaAtualizada) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    //resposta da requisicao caso deu certo
    res.json({
        id: id,
        nome: req.body["nome"],
        concluida: req.body["concluida"],
    });
}

function removerTarefa(req, res) {
    //obter id da URL
    const id = req.params.id;
    //definido numero de tarefas existentes no bd, para depois comparar e dizer se tarefa foi encontrada
    const numTarefas = tarefas.length;
    // aplicar filtro para excluir apenas tarefa requisitada (retorna o array - tarefa pedida para ser excluida)
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    //validação caso erro
    if (numTarefas === tarefas.length) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    //validação caso deu certo
    res.json({ msg: "Tarefa removida com sucesso!" });
}

function concluirTarefa(req, res) {
    //obter id da URL
    const id = req.params.id;
    // variavel para comparar no final e dizer se foi atualizado ou não
    let tarefaConcludia = false;
    // usado map para atualizar o array de bd
    tarefas = tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            tarefa.concluida = true;
            tarefaConcludia = true;
        }
        return tarefa;
    });
    // validacao caso erro
    if (!tarefaConcludia) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    //validacao caso deu certo
    res.json({ msg: "Tarefa concluida com sucesso!" });
}

module.exports = { listarTarefaId, listarTarefas, cadastrarTarefa, atualizarTarefa, removerTarefa, concluirTarefa };
