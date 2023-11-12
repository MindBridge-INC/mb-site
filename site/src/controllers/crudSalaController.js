var crudSalaModel = require("../models/crudSalaModel");

function listarSala(req, res) {
    var idInst = req.params.idInst;

    crudSalaModel.listarSala(idInst)
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

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var andar = req.body.andarServer;
    var idInst = req.body.idInstServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (andar == undefined) {
        res.status(400).send("andar está undefined!");
    } else if (idInst == undefined) {
        res.status(400).send("idInst está undefined!");
    }

    crudSalaModel.cadastrar(nome, andar, idInst)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da sala! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function trazerDados(req, res) {
    var idSala = req.params.idSala;

    crudSalaModel.trazerDados(idSala)
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
    var nome = req.body.nomeServer;
    var andar = req.body.andarServer;
    var idSala = req.body.idSalaServer;
    
    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (andar == undefined) {
        res.status(400).send("andar está undefined!");
    } else if (idSala == undefined) {
        res.status(400).send("idSala está undefined!");
    }

    crudSalaModel.editar(nome, andar, idSala)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da Sala! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarSala,
    cadastrar,
    trazerDados,
    editar
}