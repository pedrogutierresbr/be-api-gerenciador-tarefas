//Sempre iniciar o servidor com comando no terminal --> node index.js
const express = require("express");
const cors = require("cors");

const { finalizarCompra, obterCidadesPorEstado } = require("./controllers/mini-ecommerce.js");

const app = express(); //criado servidor
const port = 3001; //definido porta de atuacao do servidor

app.use(cors()); //adicionado filtro cors
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json()); //dito qual tipo de arquivo que sera trabalhado (API RestFul usa json)

//mini-ecommerce
app.post("/pay-take/checkout/finalizar-compra", finalizarCompra);

app.get("/pay-take/estado/:siglaEstado/cidades", obterCidadesPorEstado);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
