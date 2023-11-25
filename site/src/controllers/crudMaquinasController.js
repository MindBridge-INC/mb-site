var crudMaquinasModel = require("../models/crudMaquinasModel");

function visualizarMaquinasTotal(req, res) {
    var idInst = req.params.idInst;

    crudMaquinasModel.visualizarMaquinasTotal(idInst)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function visualizarMaquinas(req, res) {
    var idSala = req.params.idSala;

    crudMaquinasModel.visualizarMaquinas(idSala)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function trazerDados(req, res) {
    var idMaquina = req.params.idMaquina;

    crudMaquinasModel.trazerDados(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editar(req, res) {
    var idMaquina = req.body.idMaquinaServer;
    var idSala = req.body.idSalaServer;
    var status = req.body.statusServer;

    if (idMaquina == undefined) {
        res.status(400).send("idMaquina está undefined!");
    } else if (idSala == undefined) {
        res.status(400).send("Sala está undefined!");
    } else if (status == undefined) {
        res.status(400).send("Status está undefined!");
    }

    crudMaquinasModel.editar(idMaquina, idSala, status)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro do Maquina! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    visualizarMaquinasTotal,
    visualizarMaquinas,
    trazerDados,
    editar
}