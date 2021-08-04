const cidadesEstados = require("../cidades-estados.json");

function finalizarCompra(req, res) {
    console.log(req.body);
    res.send("ok");
}

function obterCidadesPorEstado(req, res) {
    // receber uma sigla via URL
    const siglaEstado = req.params["siglaEstado"].toUpperCase();
    //retornar todas as cidades referente a sigla vinda da URL
    const dadosEstado = cidadesEstados.estados.filter((estado) => estado.sigla === siglaEstado);
    // se sigla for inválida, retorna esse erro
    if (dadosEstado.length === 0) {
        res.status(404).json({ erro: `${siglaEstado} não é um estado válido!` });
    }
    // retorna o array cidades do primeiro elemento do array dadosEstado (como só tem um elemento, volta o da sigla filtrada)
    res.json(dadosEstado[0].cidades);
}

module.exports = { finalizarCompra, obterCidadesPorEstado };
