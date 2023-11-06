var crudAlunosModel = require("../models/crudAlunosModel");

function listarTurmas(req, res) {
    var idInst = req.params.idInst;

    crudAlunosModel.listarTurmas(idInst)
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

function visualizar(req, res) {
    var idTurma = req.params.idTurma;

    crudAlunosModel.visualizar(idTurma)
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
    var sobrenome = req.body.sobrenomeServer;
    var matricula = req.body.matriculaServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idTurma = req.body.idTurmaServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sobrenome está undefined!");
    } else if (matricula == undefined) {
        res.status(400).send("Matricula está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Senha está undefined!");
    } else if (idTurma == undefined) {
        res.status(400).send("idTurma está undefined!");
    }

    crudAlunosModel.cadastrar(nome, sobrenome, matricula, email, senha, idTurma)
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

function trazerDados(req, res) {
    var idAluno = req.params.idAluno;

    crudAlunosModel.trazerDados(idAluno)
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
    var idAluno = req.body.idAlunoServer;
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var idTurma = req.body.idTurmaServer;

    if (idAluno == undefined) {
        res.status(400).send("idAluno está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (idTurma == undefined) {
        res.status(400).send("idTurma está undefined!");
    }

    crudAlunosModel.editar(idAluno, nome, sobrenome, idTurma, email)
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
    visualizar,
    cadastrar,
    trazerDados,
    editar
}