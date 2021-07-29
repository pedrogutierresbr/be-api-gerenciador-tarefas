const uuidv4 = require("uuid/v4");

let tarefas = [
    { id: "1", nome: "Aprender React JS", concluida: true },
    { id: "2", nome: "Estudar JavaScript", concluida: false },
    { id: "3", nome: "Fazer projeto de inglês", concluida: false },
    { id: "4", nome: "Estudar testes de software", concluida: false },
];

function listarTarefaId(req, res) {
    const id = req.params.id;
    const tarefa = tarefas.filter((tarefa) => tarefa.id === id);
    if (tarefa.length === 0) {
        res.status(404).json({ erros: "Tarefa não encontrada" });
    }
    res.json(tarefa[0]);
}

module.exports = { listarTarefaId };
