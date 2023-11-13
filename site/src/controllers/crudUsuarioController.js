var crudUsuarioModel = require("../models/crudUsuarioModel");

function visualizar(req, res) {
    var idInst = req.params.idInst;

    crudUsuarioModel.visualizar(idInst)
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
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;
    var idInst = req.body.idInstServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Senha está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Tipo está undefined!");
    } else if (idInst == undefined) {
        res.status(400).send("idInst está undefined!");
    }

    crudUsuarioModel.cadastrar(nome, sobrenome, email, senha, tipo, idInst)
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
    var idUsuarioInst = req.params.idUsuarioInst;

    crudUsuarioModel.trazerDados(idUsuarioInst)
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
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;
    var idUsuarioInst = req.body.idUsuarioInstServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Senha está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Tipo está undefined!");
    } else if (idUsuarioInst == undefined) {
        res.status(400).send("idInst está undefined!");
    }

    crudUsuarioModel.editar(nome, sobrenome, email, senha, tipo, idUsuarioInst)
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
    visualizar,
    cadastrar,
    trazerDados,
    editar
}