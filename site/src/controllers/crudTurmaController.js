var crudTurmaModel = require("../models/crudTurmaModel");

function listarTurmas(req, res) {
    var idInst = req.params.idInst;

    crudTurmaModel.listarTurmas(idInst)
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
    var ano = req.body.anoServer;
    var periodo = req.body.periodoServer;
    var inicio = req.body.inicioServer;
    var fim = req.body.fimServer;
    var idInst = req.body.idInstServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("ano está undefined!");
    } else if (periodo == undefined) {
        res.status(400).send("periodo está undefined!");
    } else if (inicio == undefined) {
        res.status(400).send("inicio está undefined!");
    } else if (fim == undefined) {
        res.status(400).send("fim está undefined!");
    } else if (idInst == undefined) {
        res.status(400).send("idInst está undefined!");
    }

    crudTurmaModel.cadastrar(nome, ano, periodo, inicio, fim, idInst)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da turma! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function trazerDados(req, res) {
    var idTurma = req.params.idTurma;

    crudTurmaModel.trazerDados(idTurma)
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
                    "Houve um erro ao buscar os dados da turma: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editar(req, res) {
    var idTurma = req.body.idTurmaServer;
    var nome = req.body.nomeServer;
    var ano = req.body.anoServer;
    var periodo = req.body.periodoServer;
    var inicio = req.body.inicioServer;
    var fim = req.body.fimServer;

    if (idTurma == undefined) {
        res.status(400).send("idTurma está undefined!");

    } else if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("ano está undefined!");
    } else if (periodo == undefined) {
        res.status(400).send("periodo está undefined!");
    } else if (inicio == undefined) {
        res.status(400).send("inicio está undefined!");
    } else if (fim == undefined) {
        res.status(400).send("fim está undefined!")
    }

    crudTurmaModel.editar(nome, ano, periodo, inicio, fim, idTurma)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro do aluno! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarTurmas,
    cadastrar,
    trazerDados,
    editar
}